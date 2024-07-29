import { navLists } from "../constants/index";
import { appleImg, bagImg, searchImg } from "../utils/index";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    useGSAP(()=>{
        gsap.from(".animNavItems" , {
            scale : 2,
            opacity : 0,
            x : -10,
            y : -10,
            duration : 1.5,
            stagger: 1,
            delay: 1.5
        })
        gsap.to(".textNav" , {
            opacity : 1,
            stagger: 0.5,
            delay : 1.5
        })
    } , [])
    return (
        <header className="w-full py-5 px-5 sm:px-10 flex justify-between items-center">
            <nav className="w-full flex screen-max-width">
                <img src={appleImg} className="animNavItems" alt="logo.." width={14} height={13} />

                <div className="flex flex-1 justify-center max-sm:hidden">
                    {navLists.map((nav) => (
                        <div key={nav}   className="opacity-0 textNav px-5 text-sm cursor-pointer text-gray hover:text-white transition-all">
                            {nav}
                        </div>
                    ))}

                </div>

                <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
                    <img src={searchImg} className="animNavItems" alt="search" />
                    <img src={bagImg} className="animNavItems" alt="bag" />
                </div>
            </nav>
        </header>
    )
}

export default Navbar;