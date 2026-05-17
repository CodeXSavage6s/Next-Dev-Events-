"use client"
import { useState } from 'react'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function BookEvent({event_id}: {event_id: string}) {
  
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  
  const formData = new FormData()
  
  formData.append('email', email)
  formData.append('event_id', event_id)
  
  async function handleBooking() {
  setLoading(true)
  try {
    const response = await fetch(`${BASE_URL}/api/events/booking`, {
      method: "POST",
      body: formData
    })
    
    setMessage("Booked Successfully!!")
  } catch (err) {
    console.log("error")
    setMessage("Failed try again")
  }
  }
  
  return (
    <form className="flex flex-col gap-2 p-2 rounded-lg bg-gray-900" onSubmit={handleBooking}>
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