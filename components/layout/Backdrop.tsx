/**
 * Page-wide ambient background: a faint grid, three drifting colour fields, and
 * a top-to-bottom fade so content further down sits on a clean canvas.
 * Purely decorative and fully server-rendered — no JS ships for it.
 */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-lines mask-fade-b opacity-70" />

      <div className="absolute inset-0 mask-fade-b">
        <div className="absolute -left-40 -top-24 h-[38rem] w-[38rem] rounded-full bg-accent/25 blur-[140px] animate-drift" />
        <div
          className="absolute -right-40 top-24 h-[32rem] w-[32rem] rounded-full bg-accent2/20 blur-[140px] animate-drift"
          style={{ animationDelay: "-9s" }}
        />
        <div
          className="absolute left-1/3 top-[28rem] h-[26rem] w-[26rem] rounded-full bg-accent/15 blur-[140px] animate-drift"
          style={{ animationDelay: "-18s" }}
        />
      </div>
    </div>
  );
}
