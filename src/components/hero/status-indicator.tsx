export function StatusIndicator() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#ccff00]/15 bg-[#ccff00]/5 px-3 py-1.5">
      <span
        className="size-1.5 rounded-full bg-[#ccff00] shadow-[0_0_12px_rgba(204,255,0,0.8)]"
        aria-hidden="true"
      />

      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#ccff00]">
        Currently building
      </span>
    </div>
  )
}
