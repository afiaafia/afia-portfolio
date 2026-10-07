const proofItems = [
  {
    label: "Current focus",
    value: "Full-Stack Web Development",
  },
  {
    label: "Shipped work",
    value: "Fit Log · Task Vault",
  },
  {
    label: "Code",
    value: "github.com/afiaafia",
  },
]

export function ProofStrip() {
  return (
    <section className="relative border-y border-white/[0.07]">
      <div className="mx-auto grid max-w-[1400px] sm:grid-cols-3">
        {proofItems.map((item, index) => (
          <div
            key={item.label}
            className={`px-4 py-5 sm:px-6 lg:px-10 ${
              index !== proofItems.length - 1
                ? "border-b border-white/[0.07] sm:border-b-0 sm:border-r"
                : ""
            }`}
          >
            <p className="mono text-[10px] uppercase tracking-[0.18em] text-white/25">
              {item.label}
            </p>

            <p className="mt-2 text-sm font-medium text-white/65">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
