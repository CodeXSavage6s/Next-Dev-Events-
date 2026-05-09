"use client"
import Image from 'next/image'
import LightRays from './LightRays';
import Link from 'next/link'

export default function Navbar() {
  return (
    <div>
    <header className="">
      <nav>
        <Link href="/" className="flex flex-col justify-center text-center items-center">
          <Image src='/icons/logo.png' alt="logo png" className="logo" width={24} height={24} />
          
          <p  className="text-[small] text-gray-300">Dev Events</p>
        </Link>
        
        <ul>
          <Link href="/">Home</Link>
          <Link href="/">Events</Link>
          <Link href="/">Create Event</Link>
        </ul>
      </nav>
    </header>
    
    <div className="absolute min-h-screen z-[-1]">
      
  <LightRays
    raysOrigin="top-center-offset"
    raysColor="#5dfeca"
    raysSpeed={0.5}
    lightSpread={0.9}
    rayLength={1.4}
    followMouse={true}
    mouseInfluence={0.02}
    noiseAmount={0}
    distortion={0.01}
    pulsating={false}
    fadeDistance={.6}
    saturation={1}
/>
      </div>
    </div>
    )
}