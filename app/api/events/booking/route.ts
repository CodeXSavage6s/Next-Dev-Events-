import { query } from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
  
    const email = formData.get('email')
    const event_id = formData.get('event_id')
  
    if (!email || !event_id) {
      return NextResponse.json({ message: 'Missing email or event_id' }, { status: 400 })
    }

    // Ensure capacity: max 15 bookings per event
    const countRes = await query('SELECT COUNT(*) AS count FROM bookings WHERE event_id = $1', [event_id])
    const bookedCount = parseInt(countRes.rows?.[0]?.count ?? '0', 10)

    if (bookedCount >= 15) {
      return NextResponse.json({ message: 'Event is fully booked (capacity reached)' }, { status: 409 })
    }

    const booked = await query('INSERT INTO bookings (email, event_id) VALUES ($1, $2) RETURNING *', [email, event_id])

    return NextResponse.json({ message: 'Booked Successfully', data: booked.rows ?? booked })
  } catch (err) {
    return NextResponse.json({ message: 'Failed to book event', error: String(err) }, { status: 400 })
  }
  
}