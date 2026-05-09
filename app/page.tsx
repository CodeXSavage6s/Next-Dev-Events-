import Image from "next/image";
import ExploreBtn from '@/components/ExploreBtn.tsx'
import EventCard from '@/components/EventCard.tsx'

const events = [
  {
    title: "Next.js Conf 2026",
    image: "/images/event1.png",
    slug: "nextjs-conf-2026",
    date: "October 24, 2026",
    time: "09:00 AM",
    location: "San Francisco, CA & Online"
  },
  {
    title: "TypeScript Global Summit",
    image: "/images/event2.png",
    slug: "typescript-global-summit",
    date: "November 12, 2026",
    time: "10:30 AM",
    location: "London, UK"
  },
  {
    title: "AI & LLM Integration Workshop",
    image: "/images/event3.png",
    slug: "ai-llm-integration-workshop",
    date: "December 05, 2026",
    time: "01:00 PM",
    location: "Austin, TX"
  },
  {
    title: "Modern Backend Architectures",
    image: "/images/event4.png",
    slug: "modern-backend-architectures",
    date: "January 15, 2027",
    time: "02:00 PM",
    location: "Berlin, Germany"
  },
  {
    title: "Cloud Native & Kubernetes Day",
    image: "/images/event5.png",
    slug: "cloud-native-kubernetes-day",
    date: "February 10, 2027",
    time: "09:30 AM",
    location: "Seattle, WA"
  },
  {
    title: "The Future of Frontend Tooling",
    image: "/images/event6.png",
    slug: "future-of-frontend-tooling",
    date: "March 22, 2027",
    time: "11:00 AM",
    location: "Remote / Virtual"
  }
];


export default function Home() {
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
        events.map((event) => (
          <li key={event}>
            <EventCard {...event} />
          </li>
        ))
      }
      </ul>
        
    </div>
    </div>
  );
}
