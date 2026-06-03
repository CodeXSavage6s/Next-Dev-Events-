import { cacheLife } from 'next/cache'
import Image from "next/image";
import ExploreBtn from '@/components/ExploreBtn'
import EventCard from '@/components/EventCard'
//import { BASE_URL } from "@/app/layout"; // Adjust path based on your setup


//const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 
  (process.env.NODE_ENV === 'production'
    ? 'https://next-dev-events-sigma.vercel.app'   // ← put your real vercel url here
    : 'http://localhost:3000');


interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  organizer: string;
  agenda: string[];
  tags: string[];
  created_at: string;
  updated_at: string;
}

export default async function Home() {
  'use cache'
  cacheLife('hours')
  const response = await fetch(`${BASE_URL}/api/events`)
  
  const { events } : { events: Event[] } = await response.json()
  
  return (
    <div className="flex flex-col flex-1 font-sans dark:bg-black text-center">
        <section>
          <h1 className="text-center text-3xl">The Hub For Every Dev <br />Event You Can't Miss</h1>
    <p className="text-center mt-5">Hackathon, Meet Up and Confrence all in One Place</p>
    <ExploreBtn />
        </section>
    <div className="mt-5">
      <h3>Featured Events</h3>
      <ul className="events">
      {
        events?.map((event) => (
          <li key={event.id}>
            <EventCard {...event} />
          </li>
        ))
      }
      </ul>
        
    </div>
    </div>
  );
}
