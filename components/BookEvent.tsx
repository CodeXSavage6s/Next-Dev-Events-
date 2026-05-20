"use client"
import { useState, useEffect } from 'react'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function BookEvent({event_id, count}: {event_id: string, count: number}) {
  
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentCount, setCurrentCount] = useState(count)
  const [message, setMessage] = useState("")
  
  const formData = new FormData()
  
  
  formData.append('email', email)
  formData.append('event_id', event_id)
  
  async function handleBooking(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/api/events/booking`, {
        method: "POST",
        body: formData
      })
      
      if (!response.ok) throw new Error("Booking failed");
    
      setMessage("Booked Successfully!!")
      setCurrentCount((prev) => prev + 1);
    } catch (err) {
      console.log("error")
      setMessage("Failed try again")
    }
   }
  
  return (
    <form className="flex flex-col gap-2 p-2 rounded-lg bg-gray-900 my-3" onSubmit={handleBooking}>
      <p>
        {
          currentCount === null ? "Failed to load" :
          currentCount === 0 ? "Be First to book event" : `${currentCount} number of people have booked event ${15 - currentCount} left`
        }
      </p>
      <span className={`p-2 text-center `}>
        {
          message && message 
        }
      </span>
      <label htmlFor="email">Email</label>
      <input 
      id="email"
      type="email"
      placeholder="Enter your email"
      className="w-full"
      onChange={e => setEmail(e.target.value)}
      required
      />
      <button
      type="submit"
      className="w-full h-full text-center bg-emerald-400">
        {
          loading ? "Loading..." : "BOOK NOW!!!"
        }
      </button>
    </form>
    )
}