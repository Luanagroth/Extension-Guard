import type { AuditEntity } from "@/core/domain/types/audit.types";
import type { ExtensionEntity } from "@/core/domain/types/extension.types";

export class AuditComposer {
  compose(items: ExtensionEntity[]): AuditEntity {
    const totalExtensions = items.length;
    const averageScore = totalExtensions
      ? Math.round(items.reduce((sum, item) => sum + item.riskScore, 0) / totalExtensions)
      : 0;

    return {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      totalExtensions,
      lowCount: items.filter((item) => item.riskLevel === "low").length,
      moderateCount: items.filter((item) => item.riskLevel === "moderate").length,
      highCount: items.filter((item) => item.riskLevel === "high").length,
      criticalCount: items.filter((item) => item.riskLevel === "critical").length,
      averageScore,
      items,
    };
  }
}
