import Image from "next/image";
import ExploreBtn from '@/components/ExploreBtn.tsx'
import EventCard from '@/components/EventCard.tsx'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export default async function Home() {
  const response = await fetch(`${BASE_URL}/api/events`)
  
  const { events } = await response.json()
  
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
