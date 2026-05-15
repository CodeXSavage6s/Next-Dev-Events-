import Image from "next/image";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function Detail({params}: { params: Promise<{ slug: string}>}) {
  
  const { slug } = await params
  const response = await fetch(`${BASE_URL}/api/events/${slug}`)
  const data = await response.json()
  
  if (!data) return notFound()
  return (
    
    <div>
      <h1>Details Page</h1>
      <h2>Slug: {slug}</h2>
    </div>
    )
}