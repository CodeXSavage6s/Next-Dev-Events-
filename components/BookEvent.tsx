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
      setEmail("")
    } catch (err) {
      console.log("error")
      setMessage("Failed try again")
    } finally {
      setLoading(false)
    }
   }
  
  const spotsLeft = 15 - currentCount;
  const isFull = spotsLeft <= 0;
  
  return (
    <form id="book-event" onSubmit={handleBooking}>
      <div className="bg-dark-100 border border-dark-200 card-shadow rounded-[10px] p-6 flex flex-col gap-6">
        
        <div className="flex flex-col gap-2">
          <p className="text-light-100 font-semibold text-lg">Event Availability</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-light-200">
              {
                currentCount === null ? "Failed to load" :
                currentCount === 0 ? "Be first to book this event" : `${currentCount} people booked`
              }
            </span>
            <span className={`text-sm font-bold ${isFull ? 'text-red-500' : 'text-primary'}`}>
              {isFull ? 'Event Full' : `${spotsLeft} spots left`}
            </span>
          </div>
          <div className="w-full bg-dark-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentCount / 15) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="text-light-100 text-sm font-semibold block mb-2">
            Email Address
          </label>
          <input 
            id="email"
            type="email"
            placeholder="your@email.com"
            className="w-full bg-dark-200 rounded-[6px] px-5 py-2.5 text-foreground placeholder:text-light-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            onChange={e => setEmail(e.target.value)}
            value={email}
            required
            disabled={isFull || loading}
          />
        </div>

        {message && (
          <div className={`px-4 py-2.5 rounded-[6px] text-sm text-center font-semibold ${
            message.includes('Successfully') 
              ? 'bg-primary/20 text-primary' 
              : 'bg-red-500/20 text-red-400'
          }`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={isFull || loading}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed cursor-pointer items-center justify-center rounded-[6px] px-4 py-2.5 text-lg font-semibold text-black transition-all duration-200"
        >
          {
            loading ? "Booking..." : isFull ? "Event Full" : "BOOK NOW"
          }
        </button>
      </div>
    </form>
  )
}