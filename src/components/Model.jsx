import React, { useEffect, useRef, useState } from 'react'

import { yellowImg } from '../utils';
import ModelVeiw from './ModelVeiw';
import { models, sizes } from "../constants";
import { animateWithGSAP, animateWithGSAPTimeline } from '../utils/animation';

import * as THREE from "three"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

const Model = () => {

    const [size, setsize] = useState("small");
    const [model , setModel] = useState({
        title : "iPhone 15 Pro in Natural Titanium",
        color : ["#8F8A81" , "#FFE7B9" , "#6F6C64"],
        img : yellowImg
    })

    // camera controlls for the two iPhones
    const cameraControlSmall = useRef()
    const cameraControlLarge = useRef()

    // model for the two iPhones
    const small = useRef(new THREE.Group())
    const large = useRef(new THREE.Group())

    // rotation
    const [smallRotation , setSmallRotation] = useState(0)
    const [largeRotation , setLargeRotation] = useState(0)


    const tl = gsap.timeline();

    useEffect(()=>{
        if(size==='large'){
            animateWithGSAPTimeline(tl ,small ,smallRotation ,'#view1' ,'#view2' ,{
                transform : 'translate(-100%)',
                duration : 2
            })
        }
        if(size==='small'){
            animateWithGSAPTimeline(tl ,large ,largeRotation ,'#view2' ,'#view1' ,{
                transform : 'translate(0)',
                duration : 2
            })
        }
    }, [size])

    useGSAP(()=>{
        animateWithGSAP("#heading" , {
            scale : 1,
            y : 0,
            opacity : 1,
        })
    },[])
  return (
    <section className='common-padding'>
        <div className="screen-max-width">
            <h1 id='heading' className='section-heading translate-x-7'>Take A Closer Look</h1>
            <div className="flex flex-col items-center mt-5">
                <div className="w-full h-[75vh] md:h-[80vh] overflow-hidden relative">
                    <ModelVeiw 
                    index = {1}
                    groupRef = {small}
                    gsapType = "view1"
                    controlRef = {cameraControlSmall}
                    setRotationState = {setSmallRotation}
                    size = {size}
                    item = {model}
                     />

                    <ModelVeiw 
                    index = {2}
                    groupRef = {large}
                    gsapType = "view2"
                    controlRef = {cameraControlLarge}
                    setRotationState = {setLargeRotation}
                    size = {size}
                    item = {model}
                    />

                    <Canvas
                    className = "w-full h-full"
                    style = {{
                        position : "fixed",
                        top : 0,
                        bottom : 0,
                        right : 0,
                        left : 0,
                        overflow : "hidden"
                    }}
                    eventSource = {document.getElementById('root')}
                    >
                        <View.Port/>
                    </Canvas>
                </div>
                <div className="mx-auto w-full">
                    <p className="text-sm font-light text-center mb-5">{model.title}</p>
                    <div className="flex-center">
                        <ul className="color-container">
                            {models.map(
                                (item , i)=>(
                                    <li
                                    key={i}
                                    className='w-6 h-6 rounded-full mx-2 cursor-pointer'
                                    style={{backgroundColor : item.color[0]}}
                                    onClick={()=>setModel(item)}
                                    />
                                )
                            )}
                        </ul>

                        <button className="size-btn-container">
                            {sizes.map(
                                ({label , value}) => (
                                    <span 
                                    key={label} 
                                    className='size-btn' 
                                    style={{backgroundColor : size===value ? "white" : 'transparent' , color : size===value ? "black" : 'white' }} 
                                    onClick={()=>setsize(value)
                                    }>{label}</span>
                                )
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Model