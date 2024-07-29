import { useGSAP } from "@gsap/react"
import { animateWithGSAP } from "../utils/animation"
import { explore1Img, explore2Img, exploreVideo } from "../utils"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger);


const Features = () => {
    const videoRef = useRef();

    useGSAP(() => {
        animateWithGSAP("#features_title", { y: 0, opacity: 1 }, {})
        animateWithGSAP(".g_grow", { scale: 1, opacity: 1, ease: "power1" }, { scrub: 5.5 })
        animateWithGSAP(".g_text", { y: 0, opacity: 1 }, {})
        gsap.to('#exploreVideo', {
            scrollTrigger: {
                trigger: '#exploreVideo',
                toggleActions: 'play restart play restart',
                start: '-10% bottom',
            },
            onComplete: () => {
                videoRef.current.play();
            }
        })
        gsap.from(".tantAnim" , {
            opacity : 0,
            y : 50,
            stagger : 0.5,
            scrollTrigger: {
                trigger: '.tantAnim',
                start: 'top 90%',
                end : '50% 50%',
                scrub : 1,
            },
        })
    }, [])

    return (
        <section className="h-full common-padding bg-zinc overflow-hidden relative">
            <div className="screen-max-width">
                <div className="mb-12 w-full">
                    <h1 id="features_title" className="section-heading">
                        Explore the full Story.
                    </h1>
                </div>

                <div className="flex flex-col items-center justify-center overflow-hidden">
                    <div className="mt-32 mb-24 pl-24">
                        <h2 className="text-5xl tantAnim lg:text-7xl font-semibold">IPhone</h2>
                        <h2 className="text-5xl tantAnim lg:text-7xl font-semibold">Forged In Titanium</h2>
                    </div>
                    <div className="flex-center flex-col sm:px-10">
                        <div className="relative h-[50vh] w-full flex items-center">
                            <video playsInline id="exploreVideo" className="w-full h-full object-cover object-center" preload="none" muted autoPlay ref={videoRef}>
                                <source src={exploreVideo} type="video/mp4" />
                            </video>
                        </div>

                        <div className="flex flex-col w-full relative">
                            <div className="feature-video-container">
                                <div className="overflow-hidden h-[50vh] flex-1">
                                    <img src={explore1Img} alt="img1..." className="feature-video g_grow" />
                                </div>
                                <div className="overflow-hidden h-[50vh] flex-1">
                                    <img src={explore2Img} alt="img1..." className="feature-video g_grow" />
                                </div>
                            </div>

                            <div className="feature-text-container">
                                <div className="flex-1 flex-center">
                                    <p className="feature-text g_text">
                                        iPhone 15 Pro is {' '}
                                        <span className="text-white">
                                            the first iPhone to feature an aerospace-grade titanium design
                                        </span>,
                                        using the same alloy that spacecrafts use for missions to Mars.
                                    </p>
                                </div>

                                <div className="flex-1 flex-center">
                                    <p className="feature-text g_text">
                                        Titanium has one of the best strength-to-weight ratios of any metal, making these our {' '}
                                        <span className="text-white">
                                            lightest Pro models ever.
                                        </span>
                                        You'll notice the difference the moment you pick one up.
                                    </p>
                                </div>


                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features