import {
  AppWindow,
  BotMessageSquare,
  BrainCircuit,
  Network,
  ScanFace,
  TextSearch,
  type LucideIcon,
} from "lucide-react";
import type { ProjectCategory } from "@/data/portfolio";

const ICONS: Record<ProjectCategory, LucideIcon> = {
  "RAG & LLMs": TextSearch,
  "Agentic AI": BotMessageSquare,
  "Backend & Systems": Network,
  "Computer Vision": ScanFace,
  "Machine Learning": BrainCircuit,
  "Apps & Tools": AppWindow,
};

export function CategoryIcon({
  category,
  className,
}: {
  category: ProjectCategory;
  className?: string;
}) {
  const Icon = ICONS[category];
  return <Icon className={className} aria-hidden />;
}
