import { Badge } from "@/shared/ui/Badge";
import type { RiskLevel } from "@/core/domain/value-objects/RiskLevel";

const palette: Record<RiskLevel, string> = {
  low: "border-emerald-200 bg-emerald-50 text-emerald-800",
  moderate: "border-amber-200 bg-amber-50 text-amber-800",
  high: "border-orange-200 bg-orange-50 text-orange-800",
  critical: "border-red-200 bg-red-50 text-red-800",
};

const labels: Record<RiskLevel, string> = {
  low: "baixo",
  moderate: "moderado",
  high: "alto",
  critical: "crítico",
};

export const RiskBadge = ({ level }: { level: RiskLevel }) => <Badge className={palette[level]}>{labels[level]}</Badge>;
