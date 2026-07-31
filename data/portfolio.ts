/**
 * Single source of truth for every piece of copy on the site.
 * Nothing here is component-aware — sections read from it, never the reverse.
 */

export type Metric = { value: string; label: string };

export type ExperienceItem = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  bullets: string[];
  stack: string[];
};

/** Filter buckets shown above the project grid. Order matters. */
export const projectCategories = [
  "RAG & Retrieval",
  "Agentic Systems",
  "Applied ML",
  "LLM Evaluation",
  "Full-Stack AI",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
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
  featured?: boolean;
  /** Set once the repo is public — the card renders a link when present. */
  repo?: string;
  demo?: string;
};

export const personal = {
  name: "Aman K Gupta",
  firstName: "Aman",
  lastName: "K Gupta",
  initials: "AG",
  role: "AI / Machine Learning Engineer",
  tagline:
    "I build machine learning systems end to end — training the model, then shipping it with Docker, Kubernetes, and cloud infrastructure that holds up in production.",
  email: "work.amanguptaio@gmail.com",
  phone: "+91 9335989837",
  phoneIntl: "+919335989837",
  linkedin: "https://linkedin.com/in/aman-k-gupta",
  linkedinHandle: "aman-k-gupta",
  github: "https://github.com/TXsShadowFox",
  githubHandle: "TXsShadowFox",
  location: "Dehradun, India",
  timezone: "IST (UTC+5:30)",
  availability: "Open to full-time, internships & freelance",
  resumePath: "/resume.pdf",
  /** Update this if you deploy somewhere other than Vercel's default domain. */
  siteUrl: "https://amankgupta.dev",
};

export const summary = [
  "I'm a final-year Computer Science student specialising in AI & ML, and I build machine learning systems end to end — from training deepfake-detection and LLM-powered models to deploying them with Docker, Kubernetes, and cloud (AWS, GCP).",
  "Most of my work lives at the retrieval-augmented generation and multi-agent end of the stack: hybrid retrievers, streaming LLM APIs, evaluation harnesses, and the boring-but-critical plumbing — auth, migrations, structured logs, and tests — that separates a demo from a product.",
  "Strong in Python and C++, with a focus on clean code, measuring results with real metrics, and shipping models that work in production, not just in a notebook.",
];

export const experiences: ExperienceItem[] = [
  {
    company: "DOI Soft Tech",
    role: "AI Research Intern",
    location: "Remote",
    start: "Jun 2025",
    end: "Aug 2025",
    summary:
      "Owned model training through deployment for internal automation tooling.",
    bullets: [
      "Built and deployed supervised and unsupervised ML models supporting internal workflows, cutting data pipeline latency by ~40% through optimized feature engineering and inference scaling.",
      "Built an LLM-powered browser extension in Python and JavaScript to automate social media content generation, saving the team 10+ hours of manual work each week.",
      "Set up MLOps workflows with n8n and REST APIs; deployed containerized services on AWS and GCP using Docker and Kubernetes.",
      "Analyzed 50K+ campaign records with SQL, Pandas, and NumPy to drive marketing decisions.",
    ],
    stack: ["Python", "JavaScript", "Docker", "Kubernetes", "AWS", "GCP", "n8n", "SQL", "Pandas"],
  },
  {
    company: "Upwork",
    role: "Freelance Backend Developer",
    location: "Remote",
    start: "Mar 2025",
    end: "Apr 2025",
    summary: "Backend systems and MVPs for client products, plus quant tooling.",
    bullets: [
      "Built backend systems and MVPs with Next.js, Firebase, and TypeScript, applying system design principles to cut deployment time by ~30% and improve reliability.",
      "Developed and back-tested algorithmic trading strategies using real-time market data pipelines with sub-second latency.",
    ],
    stack: ["Next.js", "TypeScript", "Firebase", "REST APIs", "System Design"],
  },
];

export const projects: Project[] = [
  {
    id: "video-rag",
    title: "Multi-Modal Video RAG Assistant",
    kicker: "Chat with any video, cited to the exact timestamp",
    category: "RAG & Retrieval",
    year: "2026",
    featured: true,
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
    id: "enterprise-rag",
    title: "Enterprise RAG Assistant",
    kicker: "Grounded Q&A over internal company knowledge",
    category: "RAG & Retrieval",
    year: "2026",
    featured: true,
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
    category: "RAG & Retrieval",
    year: "2026",
    featured: true,
    blurb:
      "A retrieval-augmented chatbot built as a reference implementation rather than a demo: upload PDF/TXT/Markdown/DOCX, ask questions, get answers grounded in the corpus with citations back to the exact source chunks. Every major piece — embedding model, vector store, LLM — sits behind an interface and swaps in a single file.",
    problem:
      "Most RAG examples hard-wire one embedding model, one vector DB, and one provider. The moment you want to change any of them, you rewrite the app — and there are no tests to tell you what you broke.",
    approach: [
      "Ingestion pipeline: loader → recursive character chunker with deterministic SHA-256 chunk IDs → embed → upsert.",
      "Retriever supports dense cosine search and hybrid BM25 + dense fused via Reciprocal Rank Fusion.",
      "Chat service rewrites the query, retrieves, injects context, and streams the answer with prompt caching enabled.",
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
  },
  {
    id: "multi-agent-code-review",
    title: "Multi-Agent Code Review Bot",
    kicker: "Three specialist reviewers in parallel, one merged verdict",
    category: "Agentic Systems",
    year: "2026",
    featured: true,
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
    id: "finance-email-agent",
    title: "Finance Credit Follow-Up Agent",
    kicker: "Accounts-receivable chasing, escalated automatically",
    category: "Agentic Systems",
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
    id: "multi-agent-research",
    title: "Multi-Agent Research System",
    kicker: "Search → read → write → critique, as a pipeline",
    category: "Agentic Systems",
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
    id: "selfcheck-gemini",
    title: "SelfCheck-Gemini",
    kicker: "Hallucination detection, sentence by sentence",
    category: "LLM Evaluation",
    year: "2026",
    featured: true,
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
    id: "deepfake-detection",
    title: "DeepFake Detection System",
    kicker: "Research replication pushed past the published baseline",
    category: "Applied ML",
    year: "2025",
    featured: true,
    blurb:
      "A detection pipeline for manipulated images and video, built by implementing and comparing methods from three to four deepfake-detection research papers. Tuning the architecture and training pipeline raised accuracy from roughly 83% to around 88%, evaluated with precision and recall rather than accuracy alone.",
    problem:
      "Off-the-shelf detectors miss the artefacts of modern manipulation, and published results are hard to trust until you reproduce them yourself against unseen manipulation styles.",
    approach: [
      "Read and analysed 3–4 current deepfake-detection papers, then implemented their methodologies for comparison.",
      "Built a working pipeline that flags manipulated images and video frames.",
      "Refined model architecture and training loop for high-fidelity detection.",
      "Improved robustness via hyperparameter tuning, regularization, and optimization.",
      "Evaluated with precision and recall, not just headline accuracy.",
    ],
    results: [
      "Accuracy raised from ~83% to ~88% over the replicated baseline.",
      "Better generalization to manipulation styles outside the training distribution.",
      "Production-shaped inference pipeline rather than a notebook.",
    ],
    stack: ["Python", "TensorFlow", "OpenCV", "Computer Vision", "NumPy"],
    metrics: [
      { value: "~88%", label: "Detection accuracy" },
      { value: "+5pp", label: "Over replicated baseline" },
      { value: "3–4", label: "Papers implemented" },
    ],
  },
  {
    id: "medical-expense-verification",
    title: "Medical Expense Verification System",
    kicker: "Anomaly detection over 10K+ billing records",
    category: "Applied ML",
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
    id: "medicheck-ai",
    title: "MediCheck AI",
    kicker: "OCR + LLM analysis for medical bills and prescriptions",
    category: "Full-Stack AI",
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
    id: "ai-data-analyst",
    title: "AI Data Analyst Agent",
    kicker: "Natural-language questions over your own spreadsheets",
    category: "Full-Stack AI",
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
      "Works identically on Windows — no `signal.SIGALRM` dependency.",
    ],
    stack: ["Streamlit", "Gemini 2.5 Flash", "Pandas", "Plotly", "Python", "AST sandbox"],
    metrics: [
      { value: "4", label: "File formats" },
      { value: "AST", label: "Validated sandbox" },
      { value: "2-pass", label: "Generate then narrate" },
    ],
  },
];

/**
 * Declared after `projects` so the headline count is derived, not typed by
 * hand — adding a project can no longer leave the About stat stale.
 */
export const stats: { value: number; suffix: string; label: string; hint: string }[] = [
  {
    value: projects.length,
    suffix: "",
    label: "Shipped projects",
    hint: "RAG, agents, CV & applied ML",
  },
  { value: 50, suffix: "K+", label: "Records analysed", hint: "SQL, Pandas & NumPy" },
  { value: 40, suffix: "%", label: "Pipeline latency cut", hint: "at DOI Soft Tech" },
  { value: 2, suffix: "+", label: "Years in Python & C++", hint: "1+ year in MLOps" },
];

export const skillGroups: { name: string; items: string[] }[] = [
  {
    name: "Languages",
    items: ["Python", "C++", "Java", "C", "JavaScript", "TypeScript", "SQL"],
  },
  {
    name: "ML / AI",
    items: [
      "PyTorch",
      "TensorFlow",
      "Deep Learning",
      "Neural Networks",
      "LLMs",
      "RAG",
      "Fine-tuning",
      "Computer Vision",
      "NLP",
      "Anomaly Detection",
      "Feature Engineering",
      "Hyperparameter Tuning",
      "Model Evaluation",
    ],
  },
  {
    name: "MLOps & Systems",
    items: [
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Model Serving",
      "Model Monitoring",
      "REST APIs",
      "System Design",
      "Distributed Systems",
      "DSA",
    ],
  },
  {
    name: "Cloud & Data",
    items: ["AWS (S3)", "GCP", "Firebase", "Pandas", "NumPy", "SciPy", "Matplotlib"],
  },
  {
    name: "Tools",
    items: ["Git", "GitHub", "OpenCV", "n8n", "LangChain", "LangGraph", "Streamlit"],
  },
  {
    name: "Security",
    items: ["Bug Bounty", "Vulnerability Analysis", "Secure System Design"],
  },
];

/** Self-rated, used by the radar chart. Values are 0–100. */
export const strengths: { label: string; short: string; value: number }[] = [
  { label: "ML / AI", short: "ML", value: 92 },
  { label: "LLM Systems", short: "LLM", value: 90 },
  { label: "Backend", short: "BE", value: 85 },
  { label: "Data", short: "Data", value: 88 },
  { label: "MLOps", short: "Ops", value: 80 },
  { label: "Languages", short: "Lang", value: 90 },
];

export const education = {
  school: "University of Petroleum and Energy Studies (UPES)",
  shortSchool: "UPES",
  degree: "B.Tech, Computer Science Engineering",
  specialization: "Specialization in AI and ML",
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

export const certifications = [
  {
    name: "Virtual Software Engineering Internship",
    issuer: "JP Morgan Chase",
    via: "Forage",
  },
  {
    name: "Software Engineering Job Simulation",
    issuer: "Goldman Sachs",
    via: "Forage",
  },
  {
    name: "Advanced Software Engineering Job Simulation",
    issuer: "Walmart",
    via: "Forage",
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
] as const;
