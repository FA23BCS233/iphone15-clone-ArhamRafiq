import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants/index'
import { pauseImg, playImg, replayImg } from "../utils/index"
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/all";
import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef([])
  const videoDivRef = useRef([])
  const videoSpanRef = useRef([])

  const [video, setvideo] = useState({
    isEnd: false,
    startPlaying: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false
  })

  const { isEnd, isLastVideo, isPlaying, startPlaying, videoId } = video;

  const [loadedData, setloadedData] = useState([])

  useGSAP(() => {

    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
    })

    gsap.to(videoId, {
      scrollTrigger: {
        trigger: "#video",
        toogleActons: "restart none none none"
      },
      onComplete: () => {
        setvideo(pre => ({
          ...pre,
          startPlaying: true,
          isPlaying: true
        }))
      }
    })
  }, [isEnd, videoId])

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlaying && videoRef.current[videoId].play();
      }
    }
  }, [startPlaying, videoId, isPlaying, loadedData])

  const handleLoadedMetaData = (e, i) => {
    setloadedData((pre) => (
      [...pre,
        e]
    ))
  }

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          if (currentProgress != progress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 760 ? "10vw" : window.innerWidth < 1200 ? "10vw" : "4vw",
            })
          }

          gsap.to(span[videoId], {
            width: `${currentProgress}%`,
            backgroundColor: "white"
          })

        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px"
            })
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf"
            })
          }
        }
      })


      if (videoId == 0) {
        anim.restart();
      }
      // update the progress bar
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        // ticker to update the progress bar
        gsap.ticker.add(animUpdate);
      } else {
        // remove the ticker when the video is paused (progress bar is stopped)
        gsap.ticker.remove(animUpdate);
      }

    }
  }, [videoId, startPlaying])

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setvideo(pre => ({ ...pre, isEnd: true, videoId: videoId + 1 }))
        break;
      case "video-last":
        setvideo(pre => ({ ...pre, isLastVideo: true }))
        break;
      case "video-reset":
        setvideo(pre=>({...pre , videoId : 0 , isLastVideo : false}))
        break;
      case "play":
        setvideo(pre => ({ ...pre, isPlaying: !isPlaying }))
        break;
      case "pause":
        setvideo(pre=>({...pre , isPlaying : false}))
        break;
      default:
        return video;
    }
  }

  return (
    <>
      <div className="flex item-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
            <div className="video-carousel_container">

              <div className="w-full h-full flex-center rounded-3xl bg-black overflow-hidden">
                <video
                  id='video'
                  playsInline={true}
                  preload='auto'
                  muted
                  ref={(el) => { videoRef.current[i] = el }}
                  onEnded={() => i != 3 ? handleProcess("video-end", i) : handleProcess("video-last")}
                  onPlay={() => {
                    setvideo(pre => ({ ...pre, isPlaying: true }))
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetaData(e, i)}
                >
                  <source src={list.video} type='video/mp4' />
                </video>
              </div>

              <div className='absolute z-10 top-12 left-[5%]'>
                {list.textLists.map((text) => (
                  <p key={text} className='md:text-2xl text-xl font-medium' >{text}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (

            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>

          ))}
        </div>
        <button className='control-btn'>
          <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} onClick={() => handleProcess(isLastVideo ? "video-reset" : !isPlaying ? "play" : "pause")} />
        </button>
      </div>
    </>
  )
}

export default VideoCarousel