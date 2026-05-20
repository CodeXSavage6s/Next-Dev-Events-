import Image from "next/image";
import BookEvent from '@/components/BookEvent'
import { getBookingCountByEventId, getSimilarEvents } from '@/app/actions/action'
import EventCard from '@/components/EventCard.tsx'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string; }) => (
    <div className="flex flex-row gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
)

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
    <div className="flex flex-col gap-2">
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((item) => (
                <li key={item} className="list-disc list-inside">{item}</li>
            ))}
        </ul>
    </div>
)

const EventTags = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-row gap-1.5 flex-wrap">
        {tags.map((tag) => (
            <div className="pill" key={tag}>{tag}</div>
        ))}
    </div>
)

export default async function Detail({params}: { params: Promise<{ slug: string}>}) {
  
  const { slug } = await params
  const response = await fetch(`${BASE_URL}/api/events/${slug}`)
  const data = await response.json()
  
  if (!data) return notFound()
  
  const { id, title, description, overview, image, venue,
      location, date, time, mode, audience, agenda, organizer, tags } = data.event
  
  const count = await getBookingCountByEventId(id);
  const similarEvents = await getSimilarEvents(tags, id);
  
  console.log("image", image)
  return (
    <section>
      <h1>Description</h1>
      <p className="mt-2" >{ description }</p>
      <div>
        <Image src={image} alt={slug} width={400} height={600} className="my-2"/>
        <section className="flex flex-col gap-2 mb-2">
          <h2>Overview</h2>
          <p>{ overview }</p>
        </section>
        <section className="flex flex-col gap-2 mb-2">
          <h2>Event Detaials</h2>
          <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={date} />
          <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />
          <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
          <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
          <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience} />
        </section>
        <EventAgenda agendaItems={agenda}/>
        <section>
          <h2>About Organizers</h2>
          <p>{ organizer }</p>
        </section>
        <EventTags tags={tags} />
      </div>
      <div className="events my-3 flex flex-col gap-2">
        <h2>Similar Events</h2>
                    {similarEvents.length > 0 && similarEvents.map((similarEvent) => (
                        <EventCard key={similarEvent.title} {...similarEvent} />
                    ))}
                </div>
      <aside>
        <BookEvent 
        event_id={id} count={count}
        />
      </aside>
    </section>
    )
}