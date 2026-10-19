import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { skillGroups } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section">
      <div className="shell">
        <SectionHeading
          id="skills-heading"
          title="Skills"
          description="What I reach for, grouped the way I actually use it."
        />

        <Reveal>
          <dl className="card divide-y divide-line">
            {skillGroups.map((group) => (
              <div
                key={group.name}
                className="grid gap-3 px-5 py-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-baseline sm:gap-6 sm:px-6 sm:py-5"
              >
                <dt className="eyebrow">{group.name}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Tag className="text-body">{item}</Tag>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
