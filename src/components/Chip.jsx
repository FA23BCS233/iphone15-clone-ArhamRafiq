import { useGSAP } from "@gsap/react"
import { chipImg, frameImg, frameVideo } from "../utils/index"
import gsap from "gsap"
import { animateWithGSAP } from "../utils/animation"
import { useRef } from "react"

const Chip = () => {
    const videoRef = useRef();



    useGSAP(() => {
        gsap.from("#chip", {
            scale: 2,
            opacity: 0,
            scrollTrigger: {
                trigger: "#chip",
                start: "top bottom",
                end: "bottom 85%",
                scrub: 2,
            },
            ease: "power2.inOut",
        })
        gsap.from(".hiw-title", {
            scale: 2,
            opacity: 0,
            scrollTrigger: {
                trigger: ".hiw-title",
                start: "top bottom",
                end: "bottom 85%",
                scrub: 2,
            },
            ease: "power2.inOut"

        })
        animateWithGSAP(".hiw-subtitle", { 
            opacity: 1,
             y: 0 , 
            ease: "power2.inOut",
            stagger : 0.25
        }, {})
        animateWithGSAP(".g_fadeIn", { 
            opacity: 1,
            y: 0 ,
            ease: "power2.inOut",
            stagger : 0.25
        }, {})
    }, [])

    return (
        <section className="common-padding">
            <div className="screen-max-width">
                <div id="chip" className="flex-center w-full my-20">
                    <img src={chipImg} alt="A17..." width={180} height={180} />
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="hiw-title">
                        A17 Pro Chip
                        <br />A monster win for gaming.
                    </h2>
                    <p className="hiw-subtitle opacity-0 translate-y-3">
                        It's here. The biggest redesign in the history of Apple GPUs.
                    </p>
                </div>

                <div className="mt-10 md:mt-20 mb-14">
                    <div className="relative h-full flex-center">
                        <div className="overflow-hidden">
                            <img
                                src={frameImg}
                                alt="frame"
                                className="bg-transparent relative z-10"
                            />
                        </div>
                        <div className="hiw-video">
                            <video className="pointer-events-none" playsInline preload="none" muted autoPlay ref={videoRef}>
                                <source src={frameVideo} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                    <p className="text-gray font-semibold text-center mt-3">Honkai: Star Rail</p>
                </div>


                <div className="hiw-text-container">
                    <div className="flex flex-1 justify-center flex-col">
                        <p className="hiw-text g_fadeIn">
                            A17 Pro is an entirely new class of iPhone chip that delivers our {' '}
                            <span className="text-white">
                                best graphic performance by far
                            </span>.
                        </p>

                        <p className="hiw-text g_fadeIn mt-6">
                            Mobile {' '}
                            <span className="text-white">
                                games will look and feel so immersive
                            </span>,
                            with incredibly detailed environments and characters.And with industry-leading speed and efficiency, A17 Pro takes fast and runs with it.
                        </p>
                    </div>

                    <div className="flex-1 flex justify-center flex-col g_fadeIn">
                        <p className="hiw-text">New</p>
                        <p className="hiw-bigtext">Pro-class GPU</p>
                        <p className="hiw-text">with 6 cores</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Chip