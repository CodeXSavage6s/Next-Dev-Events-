'use client'
import Image from 'next/image'


export default function ExploreBtn() {
  return (
    <div>
      <button type="button" id="explore-btn" className="mt-7">
        <a href="">
          Explore Events
          {/*
          */}
          <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} />
            
        </a>
      </button>
    </div>
    )
}