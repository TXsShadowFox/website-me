/**
 * Single source of truth for every piece of copy on the site.
 * Nothing here is component-aware — sections read from it, never the reverse.
 */

export type Metric = { value: string; label: string };

export type ExperienceItem = {
  company: string;
  role: string;
  /** The product or engagement the work was for, shown under the role. */
  project?: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  bullets: string[];
  stack: string[];
};

/** Filter buckets on the projects page. Order matters. */
export const projectCategories = [
  "RAG & LLMs",
  "Agentic AI",
  "Backend & Systems",
  "Computer Vision",
  "Machine Learning",
  "Apps & Tools",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

/**
 * Illustrated covers drawn by `ProjectCover`. Only featured work has one; every
 * other project renders as a compact card.
 */
export type CoverScene = "chat" | "dag" | "review" | "selfcheck";

export type ProjectLink = { label: string; href: string };

export type Project = {
  /** Also the URL slug: /projects/<id>. */
  id: string;
  title: string;
  /** Short positioning line shown under the title. */
  kicker: string;
  category: ProjectCategory;
  year: string;
  /** 2–3 sentence brief: what it actually does. */
  blurb: string;
  problem: string;
  approach: string[];
  results: string[];
  stack: string[];
  metrics: Metric[];
  /** Featured work leads the home page as large illustrated cards. */
  featured?: boolean;
  cover?: CoverScene;
  /** Set once the repo is public — the case study links to it when present. */
  repo?: string;
  demo?: string;
  /** Extra outbound links (demo video, a second live surface). */
  links?: ProjectLink[];
};

export const personal = {
  name: "Aman K Gupta",
  firstName: "Aman",
  lastName: "K Gupta",
  initials: "AG",
  role: "Software Engineer — Backend, ML & Generative AI",
  tagline:
    "I build production AI systems — RAG platforms, agents and models — and the distributed backends that keep them fast, observable and reliable.",
  email: "work.amanguptaio@gmail.com",
  phone: "+91 93359 89837",
  phoneIntl: "+919335989837",
  linkedin: "https://www.linkedin.com/in/aman-k-gupta-23298a299/",
  github: "https://github.com/TXsShadowFox",
  githubHandle: "TXsShadowFox",
  location: "Dehradun, India",
  /** Shown beside the live clock in the hero, like a dateline. */
  locationShort: "DDN, IND",
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "IST",
  availability: "Open to full-time roles, internships & freelance",
  resumePath: "/resume.pdf",
  /** Feeds metadataBase, canonical URLs, robots.txt, the sitemap and JSON-LD. */
  siteUrl: "https://amangptxs.vercel.app",
};

/** Cycled by the typing greeting at the top of the hero. */
export const greetings = [
  "Hello",
  "Namaste",
  "Bonjour",
  "Hola",
  "Ciao",
  "Konnichiwa",
  "Hallo",
  "Olá",
] as const;

/** The hero statement; `emphasis` parts are underlined. */
export const heroStatement: { text: string; emphasis?: boolean }[] = [
  { text: "I'm Aman, a software engineer building " },
  { text: "production AI systems", emphasis: true },
  { text: " and the " },
  { text: "distributed backends", emphasis: true },
  { text: " that keep them fast and reliable." },
];

/** "Worked with" strip under the hero. `mark` picks the wordmark's typography. */
export const workedWith: {
  name: string;
  detail: string;
  mark: "sans" | "mono" | "serif";
}[] = [
  { name: "Introspect Labs", detail: "Generative AI Engineer Intern · 2026", mark: "sans" },
  { name: "DOI Soft Tech", detail: "AI Engineer Intern · 2025", mark: "mono" },
  { name: "Freelance", detail: "Backend Developer, US client · 2025", mark: "serif" },
];

export const bio =
  "I'm a final-year Computer Science student at UPES specialising in AI & ML, and I build software end to end — from training models to shipping them behind fast, observable backends. Recently that has meant a real-time talking-avatar system at Introspect Labs, a multi-tenant RAG platform running on AWS, and a distributed task queue that survives killed workers. I trust numbers over vibes: evaluations, load tests, and the tests that keep them true.";

export const experiences: ExperienceItem[] = [
  {
    company: "Introspect Labs",
    role: "Generative AI Engineer Intern",
    project: "PersonaMatrix — real-time talking AI avatar system",
    location: "Remote",
    start: "Jun 2026",
    end: "Jul 2026",
    summary:
      "Built the real-time pipeline that turns text or voice into an emotion-aware, lip-synced talking avatar.",
    bullets: [
      "Built a real-time multimodal AI service converting text and voice into emotion-aware, lip-synced video through modular STT → LLM → TTS providers, using Python, FastAPI, Socket.IO, PyTorch and MediaPipe.",
      "Cut per-turn latency from ~80 s to 17 s (4.5×) with transport profiling, SHA-keyed caching, Opus audio and streamed LLM output; added provider fallbacks and 55 automated tests with CI.",
      "Trained a context-conditioned GRU-CVAE on identity-gated footage, reaching 91% context separability, and built a FACS/blendshape harness that measured 94% emotion recognition against a 17% chance baseline.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "Socket.IO",
      "PyTorch",
      "MediaPipe",
      "GRU-CVAE",
      "STT / TTS",
      "CI",
    ],
  },
  {
    company: "DOI Soft Tech",
    role: "AI Engineer Intern",
    project: "AI developer · chatbot developer",
    location: "Remote",
    start: "Jun 2025",
    end: "Aug 2025",
    summary:
      "Took ML models and LLM tooling from training through containerised deployment.",
    bullets: [
      "Built and deployed supervised and unsupervised ML models, reducing data-pipeline latency by ~40% through feature engineering and inference optimisation.",
      "Developed an LLM-powered Python/JavaScript browser extension that automated social-media content generation, saving the team 10+ hours a week.",
      "Deployed containerised AI services on AWS and GCP with Docker and Kubernetes; integrated REST and n8n workflows and analysed 50K+ records with SQL, Pandas and NumPy.",
    ],
    stack: [
      "Python",
      "JavaScript",
      "LLMs",
      "Docker",
      "Kubernetes",
      "AWS",
      "GCP",
      "n8n",
      "SQL",
      "Pandas",
    ],
  },
  {
    company: "Freelance",
    role: "Backend Developer",
    project: "US-based client",
    location: "Remote",
    start: "Mar 2025",
    end: "Apr 2025",
    summary: "Designed and shipped backend systems and MVPs for a US-based client.",
    bullets: [
      "Architected and delivered backend systems and MVPs with Next.js, Firebase and TypeScript, applying modular system-design principles for maintainable product development.",
      "Streamlined the backend architecture and deployment workflow, cutting deployment time by ~30% while improving service reliability across deliverables.",
    ],
    stack: ["Next.js", "TypeScript", "Firebase", "REST APIs", "System Design"],
  },
];

export const projects: Project[] = [
  {
    id: "ragforge",
    title: "RAGForge",
    kicker: "Multi-tenant RAG-as-a-Service: chat API, embeddable widget and dashboard",
    category: "RAG & LLMs",
    year: "2026",
    featured: true,
    cover: "chat",
    blurb:
      "A multi-tenant RAG-as-a-Service platform. A company uploads its documents and gets a chat API that answers with page-level citations (as JSON or streamed over SSE), a one-tag embeddable chat widget, and a dashboard for documents, API keys, a playground and analytics. Every claim about it is backed by a test, the evaluation harness or a k6 load test — and it runs live on AWS.",
    problem:
      "Most RAG demos answer questions about one person's PDFs on a laptop. A real service has to isolate many tenants, ingest documents without ever losing a job, say \"I don't know\" instead of guessing, survive concurrent load, and prove its answer quality with numbers rather than screenshots.",
    approach: [
      "Upload saves the document and its ingestion job in one transaction (a transactional outbox); a worker relays jobs to RabbitMQ with retries and a dead-letter queue, then parses PDF, DOCX, HTML, Markdown or text and chunks it to ≤500 tokens without crossing a page, so every citation names one page.",
      "Hybrid retrieval inside the caller's tenant — Qdrant vector search plus Postgres full-text search — fused with Reciprocal Rank Fusion, then a cross-encoder reranks the best 10. If nothing is relevant the answer is \"I don't know\", with no LLM call at all.",
      "Follow-up questions are rewritten into standalone questions; the LLM answers from numbered sources, and citations map back to the document and page.",
      "Two-level answer cache — exact (Redis) and semantic (Qdrant at 0.98 similarity) — keyed by each tenant's docs version, so editing a document invalidates old answers instantly.",
      "Token-bucket rate limits in a single Redis Lua script (per key, user, widget visitor and IP); API keys stored as SHA-256 hashes, argon2id passwords, httpOnly session cookies and a strict CSP.",
      "ONNX embedder and reranker (no PyTorch at runtime) plus any OpenAI-compatible LLM (Groq by default) keep the whole stack light enough for one small server.",
    ],
    results: [
      "Hybrid search + reranker lifted retrieval hit@1 from 87% to 97% (hit@5 100%, MRR@10 0.987) on a 50-question evaluation.",
      "Answers judged 1.00 faithful and 0.97 correct; \"I don't know\" on 12 of 12 unanswerable questions; planted prompt-injection instructions followed in 0 of 2 answers.",
      "k6 load tests exposed a database connection-pool deadlock (92% errors → 0 at 50 users) and reranker out-of-memory crashes; after the fixes, single-user p50 latency dropped from 2.0 s to 1.3 s.",
      "Cached answers return in ~18 ms instead of ~1.3 s and spend no LLM tokens.",
      "~390 automated tests run in GitHub Actions CI; Prometheus and Grafana metrics plus OpenTelemetry traces follow a job from the upload request through the queue into the worker.",
      "Deployed on AWS EC2 with Docker Compose and Caddy (HTTPS): live dashboard, API docs, a demo widget site and a read-only Grafana.",
    ],
    stack: [
      "FastAPI",
      "Python",
      "Next.js 16",
      "Qdrant",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "ONNX Runtime",
      "Groq / OpenAI API",
      "Docker Compose",
      "Caddy",
      "AWS EC2",
      "Prometheus",
      "Grafana",
      "OpenTelemetry",
      "k6",
      "GitHub Actions",
    ],
    metrics: [
      { value: "97%", label: "Retrieval hit@1" },
      { value: "18 ms", label: "Cached answers" },
      { value: "~390", label: "Automated tests" },
    ],
    repo: "https://github.com/TXsShadowFox/ragforge",
    demo: "https://ragforge.52.64.149.103.sslip.io",
    links: [
      { label: "Widget demo", href: "https://demo.52.64.149.103.sslip.io" },
      {
        label: "Demo video",
        href: "https://drive.google.com/file/d/1B_ayTiiTNTi4bfeP_AWdbUByiCyO8G4z/view?usp=sharing",
      },
    ],
  },
  {
    id: "flowforge",
    title: "FlowForge",
    kicker: "Distributed task queue and DAG workflow engine with a live dashboard",
    category: "Backend & Systems",
    year: "2026",
    featured: true,
    cover: "dag",
    blurb:
      "A self-hosted distributed task queue and workflow orchestration platform. Submit background jobs through a REST API or a Python SDK, run them on a pool of custom workers with priorities, retries, delays, cron schedules and DAG workflows, and watch every task, worker and run live in a Next.js dashboard. PostgreSQL is the source of truth and Redis Streams only carry dispatches, so a crash, a network partition or a Redis restart delays work but never loses it.",
    problem:
      "Background jobs fail in the boring places: a worker dies mid-task, Redis restarts, a retry storm hammers a dependency, or the same job quietly runs twice. Most queues trade correctness for speed or hide those failure modes — this one makes them explicit, and proves the guarantees by killing real processes.",
    approach: [
      "Every path into a queue goes through a transactional outbox into Redis Streams, with three starvation-free priority bands per queue, consumer groups and XAUTOCLAIM reclaim.",
      "A custom asyncio worker runtime (async, thread and process executors) holds fenced leases renewed by heartbeats — tasks from crashed workers are recovered automatically, and a presumed-dead worker can never overwrite newer results.",
      "Retries with exponential backoff and equal jitter, per-task timeouts, idempotency keys, cooperative cancellation, and a dead-letter queue with bulk retry; PostgreSQL enforces the task state machine with a trigger.",
      "DAG workflows built in a visual editor that refuses cycles: immutable versions, upstream results passed downstream, and retrying a failed step resumes the run.",
      "Cron schedules in any IANA time zone, correct across daylight-saving changes, firing exactly once across scheduler replicas.",
      "Multi-tenant security: organisations, projects and four roles, 15-minute JWTs with rotating refresh cookies and theft detection, scoped hashed API keys, Argon2id and an audit log written in the same transaction as each change.",
    ],
    results: [
      "438 tasks/s on eight worker processes (143/s on one); all 244,400 benchmarked tasks succeeded on their first attempt, with none run twice.",
      "Chaos tests SIGKILL real workers and cut real network links: 8 in-flight tasks recovered after a kill with 0 duplicate successes.",
      "Profiling found and fixed two defects — an undersized connection pool (+23% throughput at eight workers) and lazily opened pools (first burst after start-up 14× faster).",
      "442 Python tests at 88.8% branch coverage, plus 5 chaos, 57 dashboard and 15 Playwright end-to-end tests; mypy strict throughout.",
      "Ten-page Next.js dashboard with live Server-Sent Events, a visual DAG editor, a command palette and light/dark themes; Prometheus alerts, Grafana and OpenTelemetry traces built in.",
      "72 API operations documented in a committed OpenAPI spec, and 12 architecture decision records explaining the trade-offs.",
    ],
    stack: [
      "Python 3.12",
      "FastAPI",
      "PostgreSQL 18",
      "Redis Streams",
      "SQLAlchemy 2",
      "asyncio",
      "Next.js 16",
      "TypeScript",
      "React Flow",
      "TanStack Query",
      "Prometheus",
      "Grafana",
      "OpenTelemetry",
      "Docker Compose",
      "Playwright",
      "GitHub Actions",
    ],
    metrics: [
      { value: "438/s", label: "Tasks on 8 workers" },
      { value: "0", label: "Duplicates in 244K tasks" },
      { value: "88.8%", label: "Branch coverage" },
    ],
    repo: "https://github.com/TXsShadowFox/Distributed-Task-Queue-Job-Processing-System",
  },
  {
    id: "multi-agent-code-review",
    title: "Multi-Agent Code Review Bot",
    kicker: "Three specialist reviewers in parallel, one merged verdict",
    category: "Agentic AI",
    year: "2026",
    featured: true,
    cover: "review",
    blurb:
      "Three specialised AI agents — bugs, security, and style — review code concurrently, and a coordinator merges and de-duplicates their findings into a single structured review. Works either as a paste-and-review web UI or as a GitHub webhook that comments directly on pull requests.",
    problem:
      "One general 'review this code' prompt produces shallow, unfocused feedback. Splitting the job across specialists gets sharper findings but leaves you with three overlapping reports to reconcile.",
    approach: [
      "LangGraph graph fans out from START to the bug, security, and style agents in parallel, then fans in to a coordinator node.",
      "Each agent has its own system prompt file, so tuning one reviewer never touches the others.",
      "Coordinator merges findings, strips duplicates, and formats the final review.",
      "`POST /review` runs the graph synchronously and returns JSON for the web UI.",
      "`POST /webhook` verifies GitHub's HMAC signature, returns 200 immediately, and reviews the PR in a background task before posting a markdown comment.",
    ],
    results: [
      "All three agents call Gemini 2.5 Flash concurrently, so wall-clock time is roughly one review, not three.",
      "Bug agent catches logic errors, null derefs, off-by-ones, and unhandled exceptions; security agent catches hardcoded secrets, SQL injection, and auth issues.",
      "Signature verification on the webhook means only GitHub can trigger a review.",
      "Two entry points share one graph — no duplicated review logic.",
    ],
    stack: ["LangGraph", "FastAPI", "Gemini 2.5 Flash", "GitHub Webhooks", "Python", "pytest"],
    metrics: [
      { value: "3", label: "Parallel agents" },
      { value: "2", label: "Entry points" },
      { value: "HMAC", label: "Verified webhooks" },
    ],
  },
  {
    id: "selfcheck-gemini",
    title: "SelfCheck-Gemini",
    kicker: "Hallucination detection, sentence by sentence",
    category: "RAG & LLMs",
    year: "2026",
    featured: true,
    cover: "selfcheck",
    blurb:
      "A SelfCheckGPT-style hallucination detector. For each question it generates one low-temperature answer plus N high-temperature samples, then measures — sentence by sentence — how well the main answer is supported by those samples. High inconsistency means a likely hallucination, and the output is a colour-coded report with per-sentence flags and explanations.",
    problem:
      "If a model truly knows a fact it states it consistently across stochastic samples; if it's hallucinating, the samples disagree. Turning that intuition into a calibrated, per-sentence score is the actual work.",
    approach: [
      "Generator makes async Gemini calls: one main answer at low temperature plus N samples at high temperature.",
      "PromptScorer uses Gemini-as-judge to label each sentence supported / contradicted / unmentioned (SelfCheckGPT-Prompt, Manakul et al. 2023).",
      "EmbeddingScorer scores 1 − mean cosine similarity to each sample's closest sentence as a cheap baseline.",
      "SemanticEntropyScorer computes Shannon entropy over semantic clusters across samples (Farquhar et al., Nature 2024).",
      "All three implement a common `Scorer` interface and fuse into a single per-sentence score in [0, 1]; SQLite caches generations and embeddings.",
    ],
    results: [
      "Three literature-backed scorers behind one interface — adding an NLI- or QA-based scorer is a one-file change.",
      "Colour-coded terminal report plus binary flags and human-readable explanations per sentence.",
      "Evaluation harness runs against HaluEval for reproducible benchmarking.",
      "Caching layer keeps repeat runs cheap during iteration.",
    ],
    stack: ["Python", "Gemini 2.5 Flash", "Pydantic", "SQLite", "Streamlit", "HaluEval", "rich"],
    metrics: [
      { value: "3", label: "Independent scorers" },
      { value: "[0,1]", label: "Fused sentence score" },
      { value: "HaluEval", label: "Benchmarked" },
    ],
  },
  {
    id: "video-rag",
    title: "Multi-Modal Video RAG Assistant",
    kicker: "Chat with any video, cited to the exact timestamp",
    category: "RAG & LLMs",
    year: "2026",
    blurb:
      "Upload a video and it gets transcribed, chunked, embedded, and indexed — then you can ask questions about it in a streaming chat, with every citation linking back to the exact timestamp it came from. A full production stack: hybrid retrieval, JWT auth, background workers, metrics, and a one-command Docker deploy.",
    problem:
      "Video is the worst format to search. Transcripts alone lose structure, and naive vector search over them returns plausible-sounding chunks with no way to verify where an answer came from.",
    approach: [
      "End-to-end ingestion pipeline: video → audio via FFmpeg → transcript via Whisper → timestamped chunks → embeddings → vector index.",
      "Hybrid retrieval combining dense vectors (FAISS / Chroma) with sparse BM25, fused by Reciprocal Rank Fusion and an optional cross-encoder reranker.",
      "Gemini 2.5 Flash answers stream to the client as token deltas over Server-Sent Events.",
      "Three-tier memory: recent turns, a rolling LLM-generated conversation summary, and per-user preference memory.",
      "Async processing through FastAPI BackgroundTasks or a Redis-backed worker so uploads never block the request.",
    ],
    results: [
      "Answers carry timestamp citations that jump straight to the source moment in the video.",
      "Production guardrails: structured JSON logs, request-id tracing, rate limiting, Prometheus metrics, and an MLflow eval harness.",
      "`docker compose up` brings up Postgres, Redis, MLflow, backend, worker, and frontend together.",
      "Every layer — vector store, embedder, LLM, storage — sits behind an interface and is swappable in one file.",
    ],
    stack: [
      "FastAPI",
      "Next.js 14",
      "Whisper",
      "FFmpeg",
      "Gemini 2.5 Flash",
      "FAISS",
      "Chroma",
      "BM25",
      "PostgreSQL",
      "Redis",
      "MLflow",
      "Docker",
    ],
    metrics: [
      { value: "Hybrid", label: "Dense + BM25 + RRF" },
      { value: "SSE", label: "Streaming answers" },
      { value: "6", label: "Services orchestrated" },
    ],
  },
  {
    id: "deepfake-detection",
    title: "DeepFake Detection System",
    kicker: "XceptionNet on FaceForensics++, checked with Grad-CAM",
    category: "Computer Vision",
    year: "2025",
    blurb:
      "A detection pipeline for manipulated faces in images and video. An ImageNet-pretrained XceptionNet is fine-tuned on FaceForensics++ face crops, evaluated on accuracy, F1 and ROC-AUC rather than accuracy alone, and inspected with Grad-CAM to see which regions drive each verdict. Tuning the architecture and training pipeline after replicating published approaches raised accuracy from roughly 83% to around 88%.",
    problem:
      "Off-the-shelf detectors miss the artefacts of modern manipulation, and published results are hard to trust until you reproduce them yourself against unseen manipulation styles.",
    approach: [
      "Studied and replicated approaches from current deepfake-detection research and Kaggle baselines before settling on an XceptionNet backbone (timm) with a custom head: pooling, dropout, a 512-unit layer and batch norm.",
      "FaceForensics++ cropped faces split 70 / 15 / 15, with a class-balanced WeightedRandomSampler so the model can't win by predicting the majority class.",
      "Augmentation with flips, colour jitter, Gaussian blur and random erasing to resist compression and lighting shortcuts.",
      "BCE-with-logits loss, AdamW, cosine warm restarts and mixed-precision training, with early stopping on validation ROC-AUC.",
      "Inference for single images and for videos — up to 30 frames sampled every 5th frame, then aggregated into one verdict.",
    ],
    results: [
      "Accuracy raised from ~83% to ~88% over the replicated baseline.",
      "Grad-CAM heatmaps show which facial regions drive each prediction, making errors debuggable instead of mysterious.",
      "Evaluated with precision, recall, F1, ROC-AUC and a confusion matrix — not headline accuracy alone.",
      "Production-shaped inference path for both images and video rather than a notebook-only model.",
    ],
    stack: [
      "Python",
      "PyTorch",
      "timm",
      "XceptionNet",
      "FaceForensics++",
      "OpenCV",
      "scikit-learn",
      "Grad-CAM",
    ],
    metrics: [
      { value: "~88%", label: "Detection accuracy" },
      { value: "+5pp", label: "Over replicated baseline" },
      { value: "3–4", label: "Papers replicated" },
    ],
    repo: "https://github.com/TXsShadowFox/DeepFake-Detection-",
  },
  {
    id: "bird-classifier",
    title: "Fine-Grained Bird Species Classifier",
    kicker: "200 look-alike species, told apart by a fine-tuned EfficientNet-B0",
    category: "Computer Vision",
    year: "2026",
    blurb:
      "A fine-grained image classifier for the CUB-200-2011 benchmark: 200 bird species that often differ by a single wing bar or beak shape. An ImageNet-pretrained EfficientNet-B0 is fine-tuned with a staged unfreeze, bounding-box crops and strong augmentation, reaching 78.6% top-1 and 95.4% top-5 accuracy on 5,794 held-out test images.",
    problem:
      "Fine-grained recognition is hard because classes differ in tiny details while pose, lighting and background vary wildly — a generic classifier happily latches onto the background instead of the bird.",
    approach: [
      "Built the CUB-200-2011 pipeline from the official metadata: image list, labels, train/test split and bounding boxes merged into one table.",
      "Bounding-box crops with 10% padding keep the model focused on the bird, not the scenery.",
      "Training augmentation with RandomResizedCrop, horizontal flips and RandAugment; evaluation with resize, centre crop and ImageNet normalisation.",
      "Two-stage transfer learning: one epoch training only the new 200-way head, then the whole backbone unfrozen at a lower learning rate.",
      "AdamW, a cosine-annealed learning rate, label smoothing of 0.1 and mixed-precision (AMP) training on a T4 GPU, keeping the best checkpoint.",
    ],
    results: [
      "78.6% top-1 and 95.4% top-5 test accuracy across 200 classes, where chance is 0.5%.",
      "Confusion analysis surfaces the genuinely hard pairs — Loggerhead vs Great Grey Shrike, American vs Fish Crow.",
      "An upload-an-image cell returns the top-5 species with probabilities.",
      "Seeded training loop that tracks top-1 and top-5 every epoch and keeps the best checkpoint.",
    ],
    stack: ["PyTorch", "torchvision", "EfficientNet-B0", "CUB-200-2011", "scikit-learn", "Google Colab"],
    metrics: [
      { value: "78.6%", label: "Top-1 accuracy" },
      { value: "95.4%", label: "Top-5 accuracy" },
      { value: "200", label: "Bird species" },
    ],
    repo: "https://github.com/TXsShadowFox/Fine-Tuned-Image-Classification-on-Bird",
  },
  {
    id: "enterprise-rag",
    title: "Enterprise RAG Assistant",
    kicker: "Grounded Q&A over internal company knowledge",
    category: "RAG & LLMs",
    year: "2026",
    blurb:
      "A multi-tenant knowledge assistant for internal docs. Teams upload PDF, DOCX, XLSX, MD, or TXT files and ask questions in natural language; answers stream back grounded in the corpus with source citations. Role-based access controls who can see which documents.",
    problem:
      "Company knowledge is scattered across formats nobody wants to read, and a general-purpose chatbot will happily invent an answer rather than admit the document doesn't say.",
    approach: [
      "Async FastAPI backend on SQLAlchemy 2.0 modelling users, documents, conversations, and messages.",
      "Document processor extracts text across five formats and chunks it for retrieval.",
      "Task-typed Gemini embeddings (`RETRIEVAL_DOCUMENT` vs `RETRIEVAL_QUERY`) batched asynchronously into a persistent ChromaDB collection using cosine similarity.",
      "RAG service retrieves, formats context, and streams a Gemini 2.5 Flash answer over SSE.",
      "JWT auth with bcrypt hashing plus role-based dependencies (`CurrentUser` / `CurrentAdmin`) guarding every route.",
    ],
    results: [
      "Answers cite the source document, so a reviewer can check the claim in one click.",
      "Admin surface exposes user management and usage stats.",
      "Clean service split — document processing, embeddings, vector store, LLM, and RAG orchestration are independent modules.",
      "Ships with Dockerfile and docker-compose for a reproducible local stack.",
    ],
    stack: [
      "FastAPI",
      "Next.js",
      "SQLAlchemy 2.0",
      "ChromaDB",
      "Gemini 2.5 Flash",
      "JWT",
      "SQLite",
      "Docker",
    ],
    metrics: [
      { value: "5", label: "Document formats" },
      { value: "RBAC", label: "Admin + user roles" },
      { value: "SSE", label: "Streamed responses" },
    ],
  },
  {
    id: "rag-chatbot",
    title: "Production RAG Chatbot",
    kicker: "Swappable RAG core with ~140 tests behind it",
    category: "RAG & LLMs",
    year: "2026",
    blurb:
      "A retrieval-augmented chatbot built as a reference implementation rather than a demo: upload PDF/TXT/Markdown/DOCX, ask questions, get answers grounded in the corpus with citations back to the exact source chunks. Every major piece — embedding model, vector store, LLM — sits behind an interface and swaps in a single file.",
    problem:
      "Most RAG examples hard-wire one embedding model, one vector DB, and one provider. The moment you want to change any of them, you rewrite the app — and there are no tests to tell you what you broke.",
    approach: [
      "Ingestion pipeline: loader → recursive character chunker with deterministic SHA-256 chunk IDs → embed → upsert, so re-ingesting the same file is idempotent.",
      "Retriever supports dense cosine search and hybrid BM25 + dense fused via Reciprocal Rank Fusion.",
      "Chat service rewrites the query, retrieves, injects context, and streams the answer over SSE with prompt caching enabled.",
      "`VectorStore` and `LLM` are abstract base classes; ChromaDB, Anthropic Claude, and Gemini are just implementations.",
      "Config through `pydantic-settings`, structured logging through `structlog`.",
    ],
    results: [
      "~140 tests covering ingestion, retrieval, generation, and the HTTP API.",
      "`mypy --strict` and `ruff` both clean; every public function type-hinted and docstringed.",
      "Changing the embedding model, vector store, or LLM is a one-file change.",
      "Streaming SSE chat endpoint with session history and document management.",
    ],
    stack: [
      "FastAPI",
      "Python 3.11",
      "Claude",
      "Gemini",
      "sentence-transformers",
      "ChromaDB",
      "Streamlit",
      "structlog",
      "pytest",
    ],
    metrics: [
      { value: "~140", label: "Tests" },
      { value: "strict", label: "mypy + ruff clean" },
      { value: "RRF", label: "Hybrid retrieval" },
    ],
    repo: "https://github.com/TXsShadowFox/AI-ChatBot-with-RAG",
  },
  {
    id: "ai-data-analyst",
    title: "AI Data Analyst Agent",
    kicker: "Natural-language questions over your own spreadsheets",
    category: "Agentic AI",
    year: "2026",
    blurb:
      "Drop in a CSV, Excel, JSON, or Parquet file and ask questions in plain English. The model writes Pandas code, an AST-validated sandbox executes it, and a second model call narrates the real computed result alongside a Plotly chart — so answers come from the data, not from the model's imagination.",
    problem:
      "Letting an LLM answer questions about a dataset from its description invites made-up numbers. Letting it execute arbitrary generated code on your machine is worse.",
    approach: [
      "Schema probe profiles each upload — column names, dtypes, semantic kinds, ranges, cardinalities — and feeds that to the model before every turn.",
      "Gemini 2.5 Flash generates Pandas code against the profiled schema.",
      "Sandbox validates the generated code by AST inspection before execution and enforces a thread-based timeout (portable across Windows, macOS, and Linux).",
      "Chart factory picks an appropriate Plotly visualisation for the result shape.",
      "A second model call summarises the actual returned values, so the narrative is tied to computed output.",
    ],
    results: [
      "Numbers in the answer come from executed code, not from the model's recollection.",
      "AST validation blocks unsafe generated code before it ever runs.",
      "Handles four file formats plus bundled sample datasets for a zero-setup demo.",
      "Every answer ends with three suggested follow-up questions grounded in the result.",
    ],
    stack: ["Streamlit", "Gemini 2.5 Flash", "Pandas", "Plotly", "Python", "AST sandbox"],
    metrics: [
      { value: "4", label: "File formats" },
      { value: "AST", label: "Validated sandbox" },
      { value: "2-pass", label: "Generate then narrate" },
    ],
    repo: "https://github.com/TXsShadowFox/AI-Data-Analyst-Agent",
  },
  {
    id: "multi-agent-research",
    title: "Multi-Agent Research System",
    kicker: "Search → read → write → critique, as a pipeline",
    category: "Agentic AI",
    year: "2026",
    blurb:
      "Give it a topic and four cooperating agents produce a sourced research report. A search agent gathers results from the live web, a reader agent scrapes the most relevant page for depth, a writer drafts a structured report, and a critic scores it out of 10 with specific strengths and gaps.",
    problem:
      "A single LLM call asked to 'research a topic' hallucinates sources and produces confident, unverifiable prose with no self-assessment.",
    approach: [
      "Search agent calls Tavily through a LangChain tool and returns titles, URLs, and snippets.",
      "Reader agent picks the most relevant URL and scrapes clean text with BeautifulSoup, stripping script/style/nav/footer nodes.",
      "Writer chain drafts a fixed structure — introduction, three-plus key findings, conclusion, and a source list.",
      "Critic chain reviews the draft against a strict output format: score, strengths, areas to improve, and a one-line verdict.",
      "Shared pipeline state threads each stage's output into the next, so the report is always grounded in what was actually retrieved.",
    ],
    results: [
      "Reports cite the URLs the search stage actually returned rather than invented references.",
      "The critic stage makes report quality measurable instead of a vibe.",
      "Tool-based design means swapping search providers or adding a fact-check agent is additive.",
    ],
    stack: ["LangChain", "GPT-4o-mini", "Tavily", "BeautifulSoup", "Python"],
    metrics: [
      { value: "4", label: "Cooperating agents" },
      { value: "X/10", label: "Automated critique" },
      { value: "Live", label: "Web-grounded sources" },
    ],
  },
  {
    id: "finance-email-agent",
    title: "Finance Credit Follow-Up Agent",
    kicker: "Accounts-receivable chasing, escalated automatically",
    category: "Agentic AI",
    year: "2026",
    blurb:
      "An AI accounts-receivable assistant that reads an invoice spreadsheet, finds overdue accounts, places each one on a five-stage escalation ladder, and drafts a follow-up email in the tone that stage calls for. Every action lands in an append-only audit log, and dry-run mode is on by default so nothing sends by accident.",
    problem:
      "Chasing overdue invoices is repetitive but not mechanical — the tone has to escalate with the age of the debt, and in finance every message sent needs a defensible paper trail.",
    approach: [
      "CSV/Excel loader tolerant of common column aliases, with a configurable 'today' reference date for reproducible runs.",
      "Overdue detector computes days overdue and classifies each row onto a 5-stage ladder: warm → firm → formal → stern → human escalation.",
      "Tone engine maps each stage to a tone profile that drives the prompt; GPT-4o generates emails against a strict JSON schema with retries.",
      "Offline deterministic fallback generates a usable draft when no API key is configured.",
      "Append-only JSON-Lines audit log with masked PII and bucketed amounts; optional LangGraph workflow with LangSmith tracing.",
    ],
    results: [
      "Anything past 30 days is deliberately routed to human review instead of auto-sent.",
      "Dry-run by default — live SMTP is strictly opt-in.",
      "Streamlit dashboard with KPIs, stage distribution, days-overdue histogram, and a top-10 worst-offenders list.",
      "Generated emails export to PDF or CSV; unit tests cover loading, detection, tone, masking, and sending.",
    ],
    stack: [
      "Python",
      "LangChain",
      "LangGraph",
      "GPT-4o",
      "Streamlit",
      "Pandas",
      "ReportLab",
      "pytest",
    ],
    metrics: [
      { value: "5", label: "Escalation stages" },
      { value: "Dry-run", label: "Safe by default" },
      { value: "JSONL", label: "Append-only audit log" },
    ],
  },
  {
    id: "medicheck-ai",
    title: "MediCheck AI",
    kicker: "OCR + LLM analysis for medical bills and prescriptions",
    category: "Apps & Tools",
    year: "2026",
    blurb:
      "Upload a medical bill, prescription, pharmacy receipt, or discharge summary and it gets OCR'd, analysed, and explained in plain language — including flagging suspicious drug combinations. Users get a downloadable PDF report; the whole stack runs from a single docker compose command.",
    problem:
      "Medical paperwork is deliberately opaque. Patients can't tell whether a line item is reasonable or whether two prescriptions interact badly, and the answer is buried in scanned images.",
    approach: [
      "Next.js 14 App Router frontend with JWT-authenticated upload and dashboard.",
      "FastAPI backend on SQLAlchemy 2 with PostgreSQL persistence.",
      "Tesseract OCR (plus `pdf2image` for PDFs) extracts text from JPG, PNG, and PDF uploads up to 15 MB.",
      "Gemini 2.5 Flash explains what's prescribed and flags suspicious combinations.",
      "ReportLab renders a downloadable PDF report of the analysis.",
    ],
    results: [
      "Upload to analysed report in roughly 10–30 seconds.",
      "Carries an explicit medical disclaimer — the output supports a conversation with a clinician, it doesn't replace one.",
      "Docker Compose brings up frontend, backend, and Postgres together for local runs.",
      "Deploy path split cleanly: backend to Render/Railway, frontend to Vercel.",
    ],
    stack: [
      "Next.js 14",
      "FastAPI",
      "PostgreSQL 16",
      "Tesseract OCR",
      "Gemini 2.5 Flash",
      "ReportLab",
      "Docker",
      "Tailwind",
    ],
    metrics: [
      { value: "10–30s", label: "Upload to report" },
      { value: "5", label: "Document types" },
      { value: "PDF", label: "Exportable analysis" },
    ],
  },
  {
    id: "medical-expense-verification",
    title: "Medical Expense Verification System",
    kicker: "Anomaly detection over 10K+ billing records",
    category: "Machine Learning",
    year: "2025",
    blurb:
      "An ML pipeline that processes over 10,000 medical billing records to surface abnormal billing patterns for fraud review. Isolation Forest handles outlier detection and regression validates expected cost, cutting false positives by around 30% so reviewers see signal instead of noise.",
    problem:
      "Billing fraud hides in volume, and a naive detector floods human reviewers with false positives until they stop trusting it entirely.",
    approach: [
      "Built an ML pipeline ingesting and normalizing 10K+ billing records.",
      "Applied Isolation Forest for unsupervised anomaly detection on billing patterns.",
      "Used regression techniques for cost validation and reliable outlier identification.",
      "Engineered features and applied normalization plus statistical analysis to stabilise inputs.",
    ],
    results: [
      "Fraud detection accuracy improved by ~25%.",
      "False positives reduced by ~30%.",
      "Clearer reporting for downstream human reviewers.",
    ],
    stack: ["Python", "PyTorch", "scikit-learn", "Isolation Forest", "Pandas", "NumPy"],
    metrics: [
      { value: "10K+", label: "Records processed" },
      { value: "−30%", label: "False positives" },
      { value: "+25%", label: "Detection accuracy" },
    ],
  },
  {
    id: "ai-reply-extension",
    title: "AI Reply Extension",
    kicker: "Context-aware social replies, drafted inside the page you're reading",
    category: "Apps & Tools",
    year: "2025",
    blurb:
      "A Chrome (Manifest V3) extension that reads the post you're looking at — or just the text you select — and drafts a two-to-three sentence reply with Gemini in the mood you pick: happy, serious, funny or supportive. Add your own context (a product, a stance, some background) to steer it, then copy the reply in one click.",
    problem:
      "Writing thoughtful replies across X, Reddit and Medium all day is slow, and generic AI replies read as spam because they ignore the post's tone, intent and details.",
    approach: [
      "A content script injects a floating 'Generate AI Reply' button and reply panel, reading the selected text or falling back to the page body — so it works on any site without per-site scraping.",
      "A background service worker calls Gemini with a structured prompt that first analyses the post's type, topic, tone, intent and two or three key details.",
      "Mood buttons regenerate the draft in a new register; an 'Add context' action folds user-supplied background into the next draft.",
      "The popup switches the extension on or off across every open tab and persists the saved context with chrome.storage.",
    ],
    results: [
      "One-click drafts that match the post's tone and reference a concrete detail from it.",
      "Four moods plus free-form context steer the reply without editing a prompt.",
      "Copy-to-clipboard and dismiss controls keep the panel out of the way.",
    ],
    stack: ["JavaScript", "Chrome Extensions (MV3)", "Gemini API", "Prompt engineering", "chrome.storage"],
    metrics: [
      { value: "4", label: "Reply moods" },
      { value: "MV3", label: "Chrome extension" },
      { value: "Any", label: "Website supported" },
    ],
    repo: "https://github.com/TXsShadowFox/AI-Extension-Bot",
  },
  {
    id: "nextaction",
    title: "NextAction",
    kicker: "Tell it how much time you have — it picks the one thing to do next",
    category: "Apps & Tools",
    year: "2026",
    blurb:
      "A lightweight productivity web app built around a single question: what should I do next? Keep a list of goals with a category, priority, time estimate and optional deadline; pick a window from 5 minutes to 2 hours, and a transparent scoring engine returns exactly one next action — with the reasons it was chosen.",
    problem:
      "Most people are stuck, not lazy. A long to-do list creates decision paralysis, and most productivity apps make you choose instead of choosing for you.",
    approach: [
      "Weighted scoring engine: deadline urgency (35%), priority (25%), how well the task fits the time window (20%) and staleness since it was last touched (15%), minus a penalty for repeatedly skipped tasks (5%).",
      "Tasks far longer than the window are filtered out; if nothing fits, it names the quickest goal and how much time it needs.",
      "Every pick comes with human-readable reasons — 'Due today', 'It's high priority', 'You haven't started this yet'.",
      "A done / skip loop updates last-worked times and skip counts, so the next recommendation adapts.",
      "Goals persist in the browser's localStorage — no account, no backend, no tracking.",
    ],
    results: [
      "One clear next action instead of a list to agonise over.",
      "Explainable recommendations rather than a black box.",
      "Zero-dependency vanilla JavaScript, HTML and CSS that loads instantly and works offline.",
    ],
    stack: ["JavaScript", "HTML", "CSS", "localStorage"],
    metrics: [
      { value: "1", label: "Action, not a list" },
      { value: "5", label: "Weighted signals" },
      { value: "0", label: "Dependencies" },
    ],
    repo: "https://github.com/TXsShadowFox/NextAction-AI",
  },
  {
    id: "movie-recommender",
    title: "Movie Recommender System",
    kicker: "Content-based recommendations across 4,800 TMDB films",
    category: "Machine Learning",
    year: "2026",
    blurb:
      "Pick a movie and get five similar ones, with posters. Every film in the TMDB 5000 dataset becomes a bag of tags — overview, genres, keywords, top-billed cast and director — which is vectorised and compared with cosine similarity; a Streamlit app serves the picks and pulls posters live from the TMDB API.",
    problem:
      "Recommendations usually need a viewing history, which a new user doesn't have. A content-based model can recommend from the very first title someone picks.",
    approach: [
      "Merged the TMDB movies and credits tables (4,803 films) and parsed the JSON-encoded genres, keywords, cast and crew columns.",
      "Built one tag string per film from its overview, genres, keywords, top-3 cast and director, collapsing multi-word names into single tokens so 'Sam Mendes' never matches 'Sam Raimi'.",
      "CountVectorizer with 5,000 features and English stop words, then cosine similarity across every pair of films, pickled for fast serving.",
      "Streamlit UI: choose a title, get the five nearest films with posters fetched from the TMDB API.",
    ],
    results: [
      "Instant recommendations from a precomputed similarity matrix.",
      "No cold-start problem for new users — one title is enough.",
      "Simple, explainable model: similar films share genres, people and themes.",
    ],
    stack: ["Python", "Pandas", "scikit-learn", "NLP", "Streamlit", "TMDB API"],
    metrics: [
      { value: "4,803", label: "Films indexed" },
      { value: "5,000", label: "Vocabulary features" },
      { value: "Top 5", label: "Similar picks" },
    ],
    repo: "https://github.com/TXsShadowFox/Movie-Recommender-System",
  },
  {
    id: "face-attendance",
    title: "Face Recognition Attendance System",
    kicker: "Webcam attendance with OpenCV face detection and LBPH recognition",
    category: "Computer Vision",
    year: "2025",
    blurb:
      "A desktop app that takes attendance by recognising faces from a webcam. Register a student and it captures a set of face samples; train once, then 'Take Attendance' detects faces with a Haar cascade, recognises them with an LBPH model and writes a timestamped row to that day's attendance sheet.",
    problem:
      "Roll calls waste class time and paper registers are easy to fake. Recognition has to run on an ordinary laptop, offline, with no GPU.",
    approach: [
      "Registration captures face samples per student from the webcam (Haar cascade detection, grayscale crops) and stores the student's ID and name.",
      "Training fits an LBPH (Local Binary Patterns Histograms) recogniser on the saved samples.",
      "Live tracking recognises faces frame by frame, overlays names, and logs ID, name, date and time to a per-day CSV.",
      "Tkinter GUI with a live clock, an attendance table and a password-protected training step.",
    ],
    results: [
      "Runs offline on a laptop CPU — no cloud service or GPU needed.",
      "Daily CSV sheets open straight in Excel or Pandas.",
      "Password-protected retraining stops casual tampering with the model.",
    ],
    stack: ["Python", "OpenCV", "LBPH", "Haar cascades", "Tkinter", "Pandas", "NumPy"],
    metrics: [
      { value: "LBPH", label: "Face recogniser" },
      { value: "Live", label: "Webcam tracking" },
      { value: "CSV", label: "Daily attendance log" },
    ],
    repo: "https://github.com/TXsShadowFox/Face-recognition-Attendance-System",
  },
  {
    id: "vgg16-face-recognition",
    title: "Few-Shot Face Recognition with VGG16",
    kicker: "Transfer learning from a handful of photos per person",
    category: "Computer Vision",
    year: "2025",
    blurb:
      "A transfer-learning experiment: recognise 13 characters from The Vampire Diaries starting from a single photo each. OpenCV augmentation expands the seed photos into a 134-image training set, and a frozen ImageNet VGG16 backbone with a new dense head learns to tell them apart.",
    problem:
      "Training a face classifier from scratch needs thousands of labelled images. With one photo per person, the only realistic route is to reuse features a large network has already learned.",
    approach: [
      "Augmentation with OpenCV — random 90° and 180° rotations plus HSV brightness and saturation scaling — grows the seed photos into 134 training images at 224×224.",
      "VGG16 pretrained on ImageNet, frozen, with its first 18 layers reused as a feature extractor.",
      "A new head — Flatten → Dense 512 → Dense 128 → 13-way softmax — trained with Adam and sparse categorical cross-entropy.",
      "A custom Keras callback stops training once accuracy passes 99%, and a predict helper labels any photo with the recognised name.",
    ],
    results: [
      "Shows how far frozen ImageNet features carry with almost no data.",
      "Augmentation turns a single photo per class into a usable training set.",
      "A compact reference for Keras transfer learning with a custom head.",
    ],
    stack: ["TensorFlow", "Keras", "VGG16", "OpenCV", "NumPy", "Google Colab"],
    metrics: [
      { value: "13", label: "People recognised" },
      { value: "134", label: "Augmented images" },
      { value: "VGG16", label: "Frozen backbone" },
    ],
    repo: "https://github.com/TXsShadowFox/Image-Recogination-VGG16",
  },
  {
    id: "ml-foundations",
    title: "Machine Learning from First Principles",
    kicker: "Regression, regularisation and classification, notebook by notebook",
    category: "Machine Learning",
    year: "2025",
    blurb:
      "My self-taught ML foundations, worked through in Jupyter: simple, polynomial and non-linear regression, Ridge and Lasso, L1/L2 regularisation, the sigmoid function and logistic regression, and k-nearest-neighbour classification — each implemented and visualised on real datasets.",
    problem:
      "Calling `model.fit()` is easy; knowing why a model underfits, overfits or needs regularisation is what makes the rest of ML make sense.",
    approach: [
      "Linear, polynomial and non-linear regression fitted and visualised to see bias and variance directly.",
      "Ridge and Lasso compared on a real dataset, with L1/L2 regularisation explored in isolation.",
      "The sigmoid function and logistic regression built up step by step for binary classification.",
      "k-NN classification to contrast instance-based learning with parametric models.",
    ],
    results: [
      "Ten notebooks that take each model from intuition to code and plots.",
      "The foundation under the deep-learning and LLM work elsewhere on this page.",
    ],
    stack: ["Python", "NumPy", "Pandas", "scikit-learn", "Matplotlib", "Jupyter"],
    metrics: [
      { value: "10", label: "Notebooks" },
      { value: "L1 / L2", label: "Regularisation" },
      { value: "k-NN", label: "Classification" },
    ],
    repo: "https://github.com/TXsShadowFox/Machine-Learning",
  },
];

/** Compact cards under "More projects" on the home page, in this order. */
export const moreProjectIds = [
  "video-rag",
  "deepfake-detection",
  "bird-classifier",
  "rag-chatbot",
  "ai-data-analyst",
  "medicheck-ai",
];

/**
 * Declared after `projects` so the headline count is derived, not typed by
 * hand — adding a project can no longer leave the About stat stale.
 */
export const stats: Metric[] = [
  { value: String(projects.length), label: "Projects shipped" },
  { value: "4.5×", label: "Latency cut at Introspect Labs" },
  { value: "97%", label: "Retrieval hit@1 in RAGForge" },
  { value: "1,000+", label: "Automated tests written" },
];

export const skillGroups: { name: string; items: string[] }[] = [
  {
    name: "Languages",
    items: ["Python", "C++", "Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    name: "Backend & APIs",
    items: [
      "FastAPI",
      "REST APIs",
      "WebSockets",
      "Server-Sent Events",
      "Next.js",
      "Caching",
      "Async processing",
      "Distributed systems",
    ],
  },
  {
    name: "Databases & Messaging",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Firebase",
      "Supabase",
      "Qdrant",
      "RabbitMQ",
      "Celery",
    ],
  },
  {
    name: "GenAI & LLMs",
    items: [
      "LLMs",
      "RAG",
      "Vector databases",
      "Embeddings",
      "LangChain",
      "LangGraph",
      "Hugging Face Transformers",
      "OpenAI API",
      "Fine-tuning (LoRA / QLoRA, PEFT)",
      "Quantization",
      "Prompt engineering",
      "Agentic AI",
    ],
  },
  {
    name: "Machine Learning",
    items: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "Deep learning",
      "NLP",
      "Computer vision (OpenCV, YOLO)",
      "RNN / GRU",
      "MLflow",
      "MLOps",
    ],
  },
  {
    name: "DevOps & Testing",
    items: [
      "AWS",
      "GCP",
      "Docker",
      "Kubernetes",
      "Git",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
      "OpenTelemetry",
      "pytest",
      "Linux",
    ],
  },
  {
    name: "Core CS",
    items: [
      "Data structures & algorithms",
      "OOP",
      "DBMS",
      "Operating systems",
      "Computer networks",
      "System design",
    ],
  },
];

export const education = {
  school: "University of Petroleum and Energy Studies (UPES)",
  shortSchool: "UPES",
  degree: "B.Tech, Computer Science Engineering",
  specialization: "Specialisation in AI & ML",
  location: "Dehradun, India",
  start: "2023",
  end: "2027",
  coursework: [
    "Machine Learning",
    "Deep Learning",
    "Data Structures & Algorithms",
    "Operating Systems",
    "DBMS",
    "Computer Networks",
    "Computer Vision",
  ],
};

export type Credential = {
  name: string;
  issuer?: string;
  /** Platform the credential was earned through. */
  via?: string;
  kind: "Certificate" | "Job simulation";
  /** Verification link, when there is one. */
  href?: string;
};

export const certifications: Credential[] = [
  {
    name: "Full-Stack AI Engineer 2026",
    issuer: "Udemy",
    kind: "Certificate",
    href: "https://ude.my/UC-4cb890f9-f679-4b2a-a897-279b4315bfc5",
  },
  {
    name: "LLM Foundations",
    kind: "Certificate",
  },
  {
    name: "Cybersecurity Job Simulation",
    issuer: "Mastercard",
    via: "Forage",
    kind: "Job simulation",
    href: "https://www.theforage.com/completion-certificates/mfxGwGDp6WkQmtmTf/vcKAB5yYAgvemepGQ_mfxGwGDp6WkQmtmTf_697cde610299781877842eff_1769796346591_completion_certificate.pdf",
  },
  {
    name: "Software Engineering Virtual Experience",
    issuer: "JPMorgan Chase",
    via: "Forage",
    kind: "Job simulation",
  },
  {
    name: "Software Engineering Job Simulation",
    issuer: "Goldman Sachs",
    via: "Forage",
    kind: "Job simulation",
  },
  {
    name: "Advanced Software Engineering Job Simulation",
    issuer: "Walmart",
    via: "Forage",
    kind: "Job simulation",
  },
];

export const achievements: { value: string; label: string; href?: string }[] = [
  { value: "150+", label: "DSA problems solved on LeetCode" },
  {
    value: "C++",
    label: "Codeforces solutions, published on GitHub",
    href: "https://github.com/TXsShadowFox/CodeForces-Code",
  },
];

/** `id` is the section the link targets on the home page. */
export const navLinks = [
  { href: "/#about", id: "about", label: "About" },
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#experience", id: "experience", label: "Experience" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/#credentials", id: "credentials", label: "Credentials" },
  { href: "/#contact", id: "contact", label: "Contact" },
] as const;

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}
