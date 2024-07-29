import gsap from 'gsap'
import {rightImg, watchImg} from "../utils/index"
import { useGSAP } from '@gsap/react'
import VideoCarousel from './VideoCarousel'
import { animateWithGSAP } from '../utils/animation'

const HighLights = () => {
  useGSAP(()=>{
    animateWithGSAP("#title" , {
      opacity : 1,
      y:0
    } , {})
    animateWithGSAP(".link" , {
      opacity : 1,
      y:0,
      stagger : 0.25
    })
  })
  return (
    <section id='highlights' className='w-screen overflow-hidden h-full common-padding bg-zinc'>
      <div className='screen-max-width '>
        <div className='mb-12 w-full md:flex items-end justify-between'>
          <h1 id='title' className='section-heading'>Get The HighLights</h1>
          <div className="flex flex-wrap items-end gap-5">
            <p className='link'>Watch the film <img src={watchImg} alt="watch" className='ml-3'/></p>
            <p className='link'>Watch the events <img src={rightImg} alt="right" className='ml-3'/></p>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  )
}

export default HighLights