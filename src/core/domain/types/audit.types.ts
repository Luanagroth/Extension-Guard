import type { ExtensionEntity } from "./extension.types";

export interface AuditEntity {
  id: string;
  createdAt: string;
  totalExtensions: number;
  lowCount: number;
  moderateCount: number;
  highCount: number;
  criticalCount: number;
  averageScore: number;
  items: ExtensionEntity[];
}
