// app/loading.tsx

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] animate-pulse">

      <div className="w-full border-b border-[#1e1e1e] px-6 py-4 flex items-center justify-between">
        <div className="h-6 w-28 bg-[#1e1e1e] rounded-md" />
        <div className="hidden sm:flex items-center gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 w-16 bg-[#1e1e1e] rounded" />
          ))}
        </div>
        <div className="h-9 w-24 bg-[#1e1e1e] rounded-lg" />
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12 flex flex-col gap-14">
        <section className="flex flex-col items-center gap-5 text-center">
          <div className="h-6 w-40 bg-[#1e1e1e] rounded-full" />
          <div className="h-12 w-3/4 bg-[#1e1e1e] rounded-lg" />
          <div className="h-6 w-1/2 bg-[#1e1e1e] rounded-lg" />
          <div className="flex gap-3 mt-2">
            <div className="h-10 w-36 bg-[#1e1e1e] rounded-xl" />
            <div className="h-10 w-36 bg-[#1e1e1e] rounded-xl" />
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="h-11 flex-1 bg-[#1e1e1e] rounded-xl" />
          <div className="h-11 w-32 bg-[#1e1e1e] rounded-xl" />
          <div className="h-11 w-32 bg-[#1e1e1e] rounded-xl" />
        </div>

        <div className="flex items-center justify-between">
          <div className="h-6 w-36 bg-[#1e1e1e] rounded" />
          <div className="h-4 w-20 bg-[#1e1e1e] rounded" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <article
              key={i}
              className="flex flex-col rounded-2xl overflow-hidden bg-[#111111] border border-[#1e1e1e]"
            >
              <div className="h-48 bg-[#1a1a1a]" />
              <div className="p-5 flex flex-col gap-3">
                <div className="flex gap-2">
                  {[...Array(2)].map((_, j) => (
                    <div key={j} className="h-5 w-14 bg-[#1e1e1e] rounded-full" />
                  ))}
                </div>
                <div className="h-5 w-4/5 bg-[#1e1e1e] rounded" />
                <div className="h-5 w-3/5 bg-[#1e1e1e] rounded" />
                <div className="flex flex-col gap-2 mt-1">
                  {[...Array(3)].map((_, k) => (
                    <div key={k} className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-[#1e1e1e] rounded-full shrink-0" />
                      <div
                        className="h-3 bg-[#1e1e1e] rounded"
                        style={{ width: `${50 + (k % 3) * 15}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="h-9 w-full bg-[#1e1e1e] rounded-lg mt-2" />
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}