import Link from 'next/link'
import Image from 'next/image'

interface Props {
  title: string,
  image: string,
  slug: string,
  date: string,
  time: string,
  location: string
}

export default function EventCard({title, image, slug, date, time, location}: Props ) {
  return (
      <Link href="/events/{slug}" id="event-card" className="text-left">
        <Image src={image} alt={title} width={410} height={400} />
        <div className="flex flex-row gap-2">
          <Image src="./icons/pin.svg" alt={title} width={14} height={14} />
          <p>{location}</p>
        </div>
        
        <p className="title">{title}</p>
        
        <div className="datetime">
          <div>
            <Image src="./icons/clock.svg" alt={title} width={14} height={14} />
          <p>{time}</p>
          </div>
          <div>
            <Image src="./icons/calendar.svg" alt={title} width={14} height={14} />
          <p>{date}</p>
          </div>
        </div>
      </Link>
    )
}