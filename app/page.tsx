import Image from "next/image";
import ExploreBtn from '@/components/ExploreBtn.tsx'
import EventCard from '@/components/EventCard.tsx'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/*const events = [
  {
    title: "Next.js Conf 2026",
    description: "The premier conference for Next.js developers, featuring the latest updates, best practices, and the future of the React ecosystem.",
    overview: "Next.js Conf 2026 brings together thousands of developers worldwide to explore the latest features in Next.js, React Server Components, edge computing, and modern web performance. Expect live demos, deep dives, and community-driven sessions.",
    image: "https://res.cloudinary.com/dukt0xrnt/image/upload/v1778714474/event-full_nz6smo.png",
    venue: "Bill Graham Civic Auditorium",
    location: "San Francisco, CA",
    date: "2026-10-24",
    time: "09:00",
    mode: "Hybrid (In-Person & Online)",
    audience: "Frontend developers, React engineers, web architects, indie hackers",
    agenda: [
      "09:00 AM - 10:00 AM | Keynote: The Future of Next.js",
      "10:15 AM - 11:30 AM | Deep Dive: React Server Components & App Router",
      "11:45 AM - 01:00 PM | Sessions: Edge Runtime, Caching, and Performance",
      "01:00 PM - 02:00 PM | Lunch & Networking",
      "02:00 PM - 03:30 PM | Workshops: Building with Next.js 15+",
      "03:45 PM - 05:00 PM | Community Talks & Closing Remarks"
    ],
    organizer: "Vercel organizes Next.js Conf to unite the global developer community around open-source innovation, modern web standards, and the evolving Next.js ecosystem.",
    slug: "nextjs-conf-2026",
    tags: ["Next.js", "React", "Frontend", "Web Performance"]
  },
  {
    title: "TypeScript Global Summit",
    description: "A world-class summit dedicated to TypeScript, covering advanced type systems, tooling, and large-scale application development.",
    overview: "TypeScript Global Summit 2026 gathers engineers, architects, and open-source contributors to explore advanced TypeScript patterns, compiler internals, and the future of statically typed JavaScript across large codebases.",
    image: "https://res.cloudinary.com/dukt0xrnt/image/upload/v1778714469/event5_jk00wk.png",
    venue: "ExCeL London",
    location: "London, UK",
    date: "2026-11-12",
    time: "10:30",
    mode: "In-Person",
    audience: "TypeScript developers, open-source contributors, software architects",
    agenda: [
      "10:30 AM - 11:30 AM | Keynote: TypeScript 6.0 & What's Next",
      "11:45 AM - 01:00 PM | Advanced Types: Mapped, Conditional & Template Literals",
      "01:00 PM - 02:00 PM | Lunch",
      "02:00 PM - 03:15 PM | Tooling Deep Dive: ESLint, ts-morph & Compiler APIs",
      "03:30 PM - 04:45 PM | Monorepo Patterns with TypeScript",
      "05:00 PM - 05:30 PM | Panel: The Future of Typed JavaScript"
    ],
    organizer: "The TypeScript Global Summit is organized by a consortium of open-source maintainers and enterprise TypeScript users to advance typed JavaScript adoption worldwide.",
    slug: "typescript-global-summit",
    tags: ["TypeScript", "JavaScript", "Open Source", "Tooling"]
  },
  {
    title: "AI & LLM Integration Workshop",
    description: "A hands-on workshop exploring how to integrate large language models into production applications.",
    overview: "This intensive workshop equips engineers and product teams with the knowledge to integrate LLMs like GPT, Claude, and Gemini into real-world applications. Topics span prompt engineering, RAG pipelines, fine-tuning, and responsible AI deployment.",
    image: "https://res.cloudinary.com/dukt0xrnt/image/upload/v1778714470/event6_wfqaky.png",
    venue: "Austin Convention Center",
    location: "Austin, TX",
    date: "2026-12-05",
    time: "13:00",
    mode: "In-Person",
    audience: "ML engineers, backend developers, product teams, AI researchers",
    agenda: [
      "01:00 PM - 02:00 PM | Intro: LLM Landscape & Integration Patterns",
      "02:15 PM - 03:30 PM | Workshop: Building RAG Pipelines",
      "03:30 PM - 04:00 PM | Coffee Break & Networking",
      "04:00 PM - 05:15 PM | Fine-Tuning vs. Prompting: When to Use What",
      "05:30 PM - 06:30 PM | Responsible AI & Production Considerations",
      "06:30 PM - 07:00 PM | Q&A & Wrap-Up"
    ],
    organizer: "AI & LLM Integration Workshop is organized by a collective of AI practitioners and developer advocates passionate about making LLM technology accessible and production-ready.",
    slug: "ai-llm-integration-workshop",
    tags: ["AI", "LLM", "Machine Learning", "RAG"]
  },
  {
    title: "Modern Backend Architectures",
    description: "A deep-dive conference exploring scalable backend patterns, microservices, event-driven systems, and cloud-native approaches.",
    overview: "Modern Backend Architectures 2027 focuses on the engineering practices powering today's most resilient systems — from microservices and event sourcing to CQRS, API gateways, and serverless. A must-attend for senior backend engineers and system designers.",
    image: "https://res.cloudinary.com/dukt0xrnt/image/upload/v1778714471/event3_z2ssfo.png",
    venue: "Estrel Congress Center",
    location: "Berlin, Germany",
    date: "2027-01-15",
    time: "14:00",
    mode: "In-Person",
    audience: "Backend engineers, system architects, CTOs, DevOps engineers",
    agenda: [
      "02:00 PM - 03:00 PM | Keynote: Designing for Scale in 2027",
      "03:15 PM - 04:30 PM | Microservices vs. Monolith: Honest Tradeoffs",
      "04:30 PM - 05:00 PM | Break & Expo",
      "05:00 PM - 06:15 PM | Event-Driven Architecture with Kafka & Pulsar",
      "06:30 PM - 07:30 PM | API Design: REST, gRPC & GraphQL at Scale",
      "07:30 PM - 08:00 PM | Closing Panel & Networking"
    ],
    organizer: "Modern Backend Architectures is organized by a group of senior engineers and tech leads across Europe to share battle-tested patterns for building robust, scalable backend systems.",
    slug: "modern-backend-architectures",
    tags: ["Backend", "Microservices", "System Design", "Cloud"]
  },
  {
    title: "Cloud Native & Kubernetes Day",
    description: "A community-driven event celebrating cloud-native technologies, container orchestration, and the Kubernetes ecosystem.",
    overview: "Cloud Native & Kubernetes Day 2027 brings together platform engineers, SREs, and cloud practitioners to explore the latest in Kubernetes, service meshes, GitOps, and observability. Talks range from beginner-friendly intros to advanced production case studies.",
    image: "https://res.cloudinary.com/dukt0xrnt/image/upload/v1778714471/event2_nlrxgc.png",
    venue: "Washington State Convention Center",
    location: "Seattle, WA",
    date: "2027-02-10",
    time: "09:30",
    mode: "Hybrid (In-Person & Online)",
    audience: "Platform engineers, SREs, DevOps teams, cloud architects",
    agenda: [
      "09:30 AM - 10:30 AM | Keynote: Kubernetes in 2027 & Beyond",
      "10:45 AM - 12:00 PM | Deep Dive: GitOps with ArgoCD & Flux",
      "12:00 PM - 01:00 PM | Lunch",
      "01:00 PM - 02:15 PM | Service Meshes: Istio, Linkerd & Cilium",
      "02:30 PM - 03:45 PM | Observability: OpenTelemetry in Production",
      "04:00 PM - 05:00 PM | Lightning Talks & Community Showcase"
    ],
    organizer: "Cloud Native & Kubernetes Day is co-organized by the CNCF Seattle chapter and local cloud practitioners committed to growing the cloud-native community in the Pacific Northwest.",
    slug: "cloud-native-kubernetes-day",
    tags: ["Kubernetes", "Cloud Native", "DevOps", "Containers"]
  },
  {
    title: "The Future of Frontend Tooling",
    description: "A virtual summit exploring the next generation of build tools, bundlers, linters, and developer experience innovations.",
    overview: "The Future of Frontend Tooling 2027 is a fully remote event bringing together tooling authors and frontend engineers to discuss what's next for Vite, Rspack, Biome, Turbopack, and the broader DX ecosystem. Expect opinionated talks, live demos, and open discussions.",
    image: "https://res.cloudinary.com/dukt0xrnt/image/upload/v1778714472/event4_pq9emi.png",
    venue: "Virtual",
    location: "Remote / Virtual",
    date: "2027-03-22",
    time: "11:00",
    mode: "Online",
    audience: "Frontend developers, tooling authors, DX engineers, open-source contributors",
    agenda: [
      "11:00 AM - 12:00 PM | Keynote: The Bundler Wars Are Over (Or Are They?)",
      "12:15 PM - 01:15 PM | Vite 7, Rspack & Turbopack: A Honest Comparison",
      "01:15 PM - 02:00 PM | Break",
      "02:00 PM - 03:00 PM | Linting in 2027: Biome, ESLint & Beyond",
      "03:15 PM - 04:15 PM | Monorepos & Caching: Turborepo vs. Nx",
      "04:30 PM - 05:00 PM | Open Panel: The Future of DX"
    ],
    organizer: "The Future of Frontend Tooling is organized by a group of open-source maintainers and developer experience advocates who believe great tooling is the foundation of great products.",
    slug: "future-of-frontend-tooling",
    tags: ["Frontend", "Tooling", "DX", "Build Tools"]
  }
];*/


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
          <li key={event.slug}>
            <EventCard {...event} />
          </li>
        ))
      }
      </ul>
        
    </div>
    </div>
  );
}
