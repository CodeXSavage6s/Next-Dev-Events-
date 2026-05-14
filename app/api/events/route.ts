import { query } from '@/lib/db.ts';
import { NextResponse } from 'next/server';
import { multer } from 'multer'
import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


export async function GET() {
  try {
    const result = await query('SELECT * FROM events');
    console.log("result", result.rows)
    return NextResponse.json({ events: result.rows });
} catch (err) {
  console.error("DB ERROR:", err); // Look at your Termux terminal where the server is running!
  return NextResponse.json({ 
    error: 'Database error', 
    message: err instanceof Error ? err.message : String(err) 
  }, { status: 500 });
}
}