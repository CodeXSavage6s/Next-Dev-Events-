import { query } from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export async function GET() {
  try {
    const result = await query('SELECT * FROM events ORDER BY date ASC');
    return NextResponse.json({ events: result.rows });
  } catch (err) {
    console.error("DB ERROR:", err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    //console.log("recieved", formData)
    const file = formData.get('image') as File | null;
    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadRes: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: "auto" }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }).end(buffer);
    });

    const title = formData.get('title');
    const slug = formData.get('slug');
    const description = formData.get('description');
    const overview = formData.get('overview');
    const venue = formData.get('venue');
    const location = formData.get('location');
    const date = formData.get('date');
    const time = formData.get('time');
    const mode = formData.get('mode');
    const audience = formData.get('audience');
    const organizer = formData.get('organizer');
    
    const agenda = formData.get('agenda') ? JSON.parse(formData.get('agenda') as string) : [];
    const tags = formData.get('tags') ? JSON.parse(formData.get('tags') as string) : [];

    const sql = `
      INSERT INTO events (
        title, slug, description, overview, image, venue, 
        location, date, time, mode, audience, agenda, organizer, tags
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *;
    `;

    const values = [
      title, slug, description, overview, uploadRes.secure_url, venue,
      location, date, time, mode, audience, JSON.stringify(agenda), 
      organizer, JSON.stringify(tags)
    ];

    const result = await query(sql, values);

    return NextResponse.json({ 
      message: "Event created successfully", 
      event: result.rows[0] 
    }, { status: 201 });

  } catch (err) {
    console.error("POST ERROR:", err);
    return NextResponse.json({ 
      error: 'Server error', 
      message: err instanceof Error ? err.message : "Unknown error" 
    }, { status: 500 });
  }
}
