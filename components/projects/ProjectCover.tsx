import type { CSSProperties, ReactNode } from "react";
import type { CoverScene } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/**
 * Illustrated covers for featured work. Each scene is a small SVG mock of the
 * real product drawn on a 480×300 canvas, so it scales cleanly from a phone
 * card to a case-study banner and follows the theme through Tailwind's
 * fill/stroke tokens. Purely decorative: titles and copy carry the content.
 */

const W = 480;
const H = 300;

/** `R G B` triplets feeding the `.cover-wash` gradient. */
const TINTS: Record<CoverScene, string> = {
  chat: "229 152 58",
  dag: "45 180 160",
  review: "150 120 230",
  selfcheck: "230 100 110",
};

const SCENES: Record<CoverScene, () => ReactNode> = {
  chat: ChatScene,
  dag: DagScene,
  review: ReviewScene,
  selfcheck: SelfCheckScene,
};

export function ProjectCover({
  scene,
  variant = "card",
  className,
}: {
  scene: CoverScene;
  /** `banner` widens the frame for case-study headers; the scene stays centred. */
  variant?: "card" | "banner";
  className?: string;
}) {
  const Scene = SCENES[scene];
  return (
    <div
      aria-hidden
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface2",
        variant === "banner" && "sm:aspect-[2/1] lg:aspect-[5/2]",
        className
      )}
      style={{ "--tint": TINTS[scene] } as CSSProperties}
    >
      <div className="cover-wash absolute inset-0" />
      <div className="cover-dots absolute inset-0" />
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 h-full w-full drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.025]"
      >
        <Scene />
      </svg>
    </div>
  );
}

function Window({
  x,
  y,
  w,
  h,
  title,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} className="fill-surface stroke-line2" />
      <line x1={x} x2={x + w} y1={y + 28} y2={y + 28} className="stroke-line" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + 16 + i * 12} cy={y + 14} r={3.5} className="fill-fg/15" />
      ))}
      <text x={x + 58} y={y + 17.5} fontSize={10} className="fill-subtle font-mono">
        {title}
      </text>
    </g>
  );
}

/* RAGForge: a cited answer from the chat playground. --------------------- */
function ChatScene() {
  return (
    <>
      <Window x={44} y={30} w={392} h={222} title="ragforge · playground" />

      <rect x={212} y={74} width={204} height={30} rx={12} className="fill-fg/[0.08]" />
      <text x={226} y={93} fontSize={11.5} className="fill-fg">
        Late fee for library books?
      </text>

      <rect x={64} y={116} width={300} height={54} rx={12} className="fill-surface2 stroke-line" />
      <text x={78} y={138} fontSize={11.5} className="fill-body">
        A late return costs 5 rupees per day
      </text>
      <text x={78} y={157} fontSize={11.5} className="fill-body">
        for each book.{" "}
        <tspan fontSize={10.5} className="fill-accent font-mono">
          [1]
        </tspan>
      </text>

      <text x={64} y={192} fontSize={8.5} letterSpacing={1.5} className="fill-subtle font-mono">
        SOURCES
      </text>
      <rect x={64} y={199} width={140} height={22} rx={6} className="fill-surface2 stroke-line" />
      <text x={74} y={214} fontSize={10} className="fill-muted font-mono">
        [1] library-guide.md
      </text>
      <rect x={212} y={199} width={108} height={22} rx={6} className="fill-surface2 stroke-line" />
      <text x={222} y={214} fontSize={10} className="fill-muted font-mono">
        hybrid + rerank
      </text>

      <rect x={298} y={236} width={152} height={30} rx={15} className="fill-surface stroke-line2" />
      <circle cx={316} cy={251} r={4} className="fill-positive" />
      <text x={328} y={255} fontSize={10.5} className="fill-body font-mono">
        cache hit · 18 ms
      </text>
    </>
  );
}

/* FlowForge: a live DAG run plus the throughput benchmark. --------------- */
type NodeState = "done" | "running" | "queued";

const DAG_NODES: { id: string; x: number; y: number; state: NodeState }[] = [
  { id: "fetch", x: 56, y: 94, state: "done" },
  { id: "parse", x: 155, y: 94, state: "done" },
  { id: "embed", x: 253, y: 70, state: "running" },
  { id: "classify", x: 253, y: 118, state: "done" },
  { id: "publish", x: 352, y: 94, state: "queued" },
];

const DAG_EDGES = [
  "M128 107 L155 107",
  "M227 107 C240 107 240 83 253 83",
  "M227 107 C240 107 240 131 253 131",
  "M325 83 C338 83 338 107 352 107",
  "M325 131 C338 131 338 107 352 107",
];

const THROUGHPUT = [143, 256, 365, 438];

function DagScene() {
  return (
    <>
      <Window x={40} y={28} w={400} h={240} title="flowforge · workflow run · live" />

      {DAG_EDGES.map((d) => (
        <path key={d} d={d} fill="none" strokeWidth={1.25} className="stroke-line2" />
      ))}

      {DAG_NODES.map((node) => (
        <g key={node.id}>
          <rect
            x={node.x}
            y={node.y}
            width={72}
            height={26}
            rx={8}
            strokeDasharray={node.state === "queued" ? "3 3" : undefined}
            className={cn(
              "fill-surface2",
              node.state === "running" ? "stroke-accent" : "stroke-line2"
            )}
          />
          {node.state === "running" && (
            <circle
              cx={node.x + 11}
              cy={node.y + 13}
              r={7}
              className="fill-accent/25 motion-safe:animate-pulse-soft"
            />
          )}
          <circle
            cx={node.x + 11}
            cy={node.y + 13}
            r={3.5}
            className={cn(
              node.state === "done" && "fill-positive",
              node.state === "running" && "fill-accent",
              node.state === "queued" && "fill-subtle/60"
            )}
          />
          <text x={node.x + 21} y={node.y + 16.5} fontSize={9.5} className="fill-body font-mono">
            {node.id}
          </text>
        </g>
      ))}

      <line x1={40} x2={440} y1={164} y2={164} className="stroke-line" />

      <text x={56} y={186} fontSize={8.5} letterSpacing={1.5} className="fill-subtle font-mono">
        TASKS / S BY WORKERS
      </text>
      {THROUGHPUT.map((value, i) => {
        const h = (value / 438) * 48;
        return (
          <g key={value}>
            <rect
              x={58 + i * 26}
              y={244 - h}
              width={16}
              height={h}
              rx={3}
              className="fill-accent"
              fillOpacity={0.35 + i * 0.21}
            />
            <text
              x={66 + i * 26}
              y={258}
              fontSize={8}
              textAnchor="middle"
              className="fill-subtle font-mono"
            >
              {[1, 2, 4, 8][i]}
            </text>
          </g>
        );
      })}

      <text x={262} y={216} fontSize={30} fontWeight={700} className="fill-fg">
        438
      </text>
      <text x={262} y={234} fontSize={10} className="fill-muted font-mono">
        tasks / s on 8 workers
      </text>
      <circle cx={266} cy={250} r={3.5} className="fill-positive" />
      <text x={276} y={253.5} fontSize={9.5} className="fill-muted font-mono">
        0 lost · 0 run twice
      </text>
    </>
  );
}

/* Multi-agent code review: a diff with three agents' findings. ----------- */
type DiffLine = { n: number; sign: " " | "-" | "+"; code: string; indent: number };

const DIFF: DiffLine[] = [
  { n: 1, sign: " ", indent: 0, code: "def get_user(uid):" },
  { n: 2, sign: "-", indent: 1, code: 'q = f"SELECT * FROM users WHERE id={uid}"' },
  { n: 2, sign: "+", indent: 1, code: 'q = "SELECT * FROM users WHERE id = %s"' },
  { n: 3, sign: " ", indent: 1, code: "row = db.execute(q, (uid,)).fetchone()" },
  { n: 4, sign: "-", indent: 1, code: 'return row["name"]' },
  { n: 4, sign: "+", indent: 1, code: 'return row["name"] if row else None' },
];

const FINDINGS = [
  { tag: "SECURITY", text: "SQL injection through an f-string · L2", tone: "danger" },
  { tag: "BUG", text: "None row raises TypeError · L4", tone: "accent" },
  { tag: "STYLE", text: "Add type hints to get_user()", tone: "muted" },
] as const;

function ReviewScene() {
  return (
    <>
      <Window x={36} y={24} w={408} h={254} title="PR #128 · reviewed by 3 agents" />

      {DIFF.map((line, i) => {
        const y = 68 + i * 17;
        return (
          <g key={`${line.sign}${line.code}`}>
            {line.sign !== " " && (
              <rect
                x={37}
                y={y - 11.5}
                width={406}
                height={16}
                className={line.sign === "-" ? "fill-danger/[0.12]" : "fill-positive/[0.12]"}
              />
            )}
            <text x={50} y={y} fontSize={9} className="fill-subtle/70 font-mono">
              {line.n}
            </text>
            <text
              x={64}
              y={y}
              fontSize={10}
              className={cn(
                "font-mono",
                line.sign === "-" && "fill-danger",
                line.sign === "+" && "fill-positive",
                line.sign === " " && "fill-subtle"
              )}
            >
              {line.sign}
            </text>
            <text x={78 + line.indent * 24} y={y} fontSize={10} className="fill-body font-mono">
              {line.code}
            </text>
          </g>
        );
      })}

      {FINDINGS.map((finding, i) => {
        const y = 186 + i * 24;
        return (
          <g key={finding.tag}>
            <rect
              x={50}
              y={y - 13}
              width={66}
              height={18}
              rx={5}
              className={cn(
                finding.tone === "danger" && "fill-danger/15",
                finding.tone === "accent" && "fill-accent/15",
                finding.tone === "muted" && "fill-fg/[0.07]"
              )}
            />
            <text
              x={83}
              y={y}
              fontSize={8.5}
              fontWeight={600}
              letterSpacing={0.8}
              textAnchor="middle"
              className={cn(
                "font-mono",
                finding.tone === "danger" && "fill-danger",
                finding.tone === "accent" && "fill-accent",
                finding.tone === "muted" && "fill-muted"
              )}
            >
              {finding.tag}
            </text>
            <text x={126} y={y} fontSize={10.5} className="fill-body">
              {finding.text}
            </text>
          </g>
        );
      })}

      <text x={50} y={264} fontSize={9.5} className="fill-subtle font-mono">
        coordinator · 3 findings · 1 duplicate merged
      </text>
    </>
  );
}

/* SelfCheck-Gemini: per-sentence hallucination scores. ------------------- */
const SENTENCES = [
  { text: "The Eiffel Tower is in Paris.", score: "0.04", tone: "positive" },
  { text: "It was completed in 1889.", score: "0.09", tone: "positive" },
  { text: "It stands 512 metres tall.", score: "0.87", tone: "danger" },
  { text: "Gustave Eiffel's company built it.", score: "0.31", tone: "accent" },
] as const;

const LEGEND = [
  { label: "supported", tone: "positive", x: 56 },
  { label: "uncertain", tone: "accent", x: 142 },
  { label: "likely hallucinated", tone: "danger", x: 228 },
] as const;

const TONE_FILL = {
  positive: "fill-positive",
  accent: "fill-accent",
  danger: "fill-danger",
} as const;

const TONE_WASH = {
  positive: "fill-positive/10",
  accent: "fill-accent/15",
  danger: "fill-danger/15",
} as const;

function SelfCheckScene() {
  return (
    <>
      <Window x={40} y={26} w={400} h={248} title="selfcheck · 1 answer vs 5 samples" />

      <text x={56} y={74} fontSize={8.5} letterSpacing={1.5} className="fill-subtle font-mono">
        SENTENCE
      </text>
      <text
        x={424}
        y={74}
        fontSize={8.5}
        letterSpacing={1.5}
        textAnchor="end"
        className="fill-subtle font-mono"
      >
        SCORE
      </text>

      {SENTENCES.map((sentence, i) => {
        const y = 84 + i * 34;
        return (
          <g key={sentence.text}>
            <rect x={52} y={y} width={376} height={28} rx={7} className={TONE_WASH[sentence.tone]} />
            <text x={64} y={y + 18} fontSize={11.5} className="fill-body">
              {sentence.text}
            </text>
            <text
              x={416}
              y={y + 18}
              fontSize={11}
              fontWeight={600}
              textAnchor="end"
              className={cn("font-mono", TONE_FILL[sentence.tone])}
            >
              {sentence.score}
            </text>
          </g>
        );
      })}

      {LEGEND.map((item) => (
        <g key={item.label}>
          <circle cx={item.x + 4} cy={234} r={3.5} className={TONE_FILL[item.tone]} />
          <text x={item.x + 13} y={237.5} fontSize={9.5} className="fill-muted font-mono">
            {item.label}
          </text>
        </g>
      ))}

      <text x={56} y={259} fontSize={9} className="fill-subtle font-mono">
        fused: prompt judge · embeddings · semantic entropy
      </text>
    </>
  );
}
