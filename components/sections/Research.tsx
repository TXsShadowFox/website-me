import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ResearchCard } from "@/components/research/ResearchCard";
import { research } from "@/data/portfolio";

export function Research() {
  return (
    <section id="research" aria-labelledby="research-heading" className="section">
      <div className="shell">
        <SectionHeading
          id="research-heading"
          title="Research"
          description="Independent follow-up studies on recent papers: reproduce the published results first, then test what really drives them and add something new. Both manuscripts are being prepared for submission."
        />

        <ul className="grid list-none gap-x-6 gap-y-14 sm:grid-cols-2">
          {research.map((paper, i) => (
            <Reveal as="li" key={paper.id} delay={(i % 2) * 0.08}>
              <ResearchCard paper={paper} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
