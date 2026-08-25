// app/events/[slug]/loading.tsx

export default function EventDetailLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white animate-pulse">

      <div className="w-full h-[340px] bg-[#1a1a1a]" />

      <main className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="h-9 w-2/3 bg-[#1e1e1e] rounded-lg" />
          <div className="h-4 w-full bg-[#1e1e1e] rounded" />
          <div className="h-4 w-4/5 bg-[#1e1e1e] rounded" />
          <div className="flex gap-2 mt-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 w-16 bg-[#1e1e1e] rounded-full" />
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-[#1e1e1e]" />

        <section className="flex flex-col gap-3">
          <div className="h-5 w-28 bg-[#1e1e1e] rounded" />
          <div className="h-4 w-full bg-[#1e1e1e] rounded" />
          <div className="h-4 w-full bg-[#1e1e1e] rounded" />
          <div className="h-4 w-3/4 bg-[#1e1e1e] rounded" />
        </section>

        <div className="w-full h-px bg-[#1e1e1e]" />

        <section className="flex flex-col gap-4">
          <div className="h-5 w-36 bg-[#1e1e1e] rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-5 w-5 bg-[#1e1e1e] rounded-full shrink-0" />
                <div className="h-4 bg-[#1e1e1e] rounded w-3/4" />
              </div>
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-[#1e1e1e]" />

        <section className="flex flex-col gap-4">
          <div className="h-5 w-24 bg-[#1e1e1e] rounded" />
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1 h-3 w-3 bg-[#1e1e1e] rounded-full shrink-0" />
              <div
                className="h-4 bg-[#1e1e1e] rounded"
                style={{ width: `${65 + (i % 3) * 10}%` }}
              />
            </div>
          ))}
        </section>

        <div className="w-full h-px bg-[#1e1e1e]" />

        <section className="flex flex-col gap-3">
          <div className="h-5 w-40 bg-[#1e1e1e] rounded" />
          <div className="h-4 w-full bg-[#1e1e1e] rounded" />
          <div className="h-4 w-5/6 bg-[#1e1e1e] rounded" />
        </section>

        <div className="w-full h-px bg-[#1e1e1e]" />

        <section className="flex flex-col gap-4">
          <div className="h-5 w-36 bg-[#1e1e1e] rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col gap-3 rounded-xl overflow-hidden bg-[#111111] border border-[#1e1e1e]">
                <div className="h-36 bg-[#1a1a1a]" />
                <div className="p-3 flex flex-col gap-2">
                  <div className="h-4 w-3/4 bg-[#1e1e1e] rounded" />
                  <div className="h-3 w-1/2 bg-[#1e1e1e] rounded" />
                  <div className="h-3 w-2/3 bg-[#1e1e1e] rounded" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}