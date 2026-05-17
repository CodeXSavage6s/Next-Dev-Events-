import { query } from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
  
    const email = formData.get('email')
    const event_id = formData.get('event_id')
  
    const booked = await query("INSERT INTO bookings (email, event_id) VALUES ($1, $2)", [email, event_id])
    
    NextResponse.json({message: "Booked Successfully", data: booked})
  } catch (err) {
    NextResponse.json({message: "Failed to book event", err}, {status: 400})
  }
  
}