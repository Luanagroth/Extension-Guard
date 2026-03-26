import type { SensitivityLevel } from "@/core/domain/value-objects/SensitivityLevel";

export const scoreThresholds = {
  low: 24,
  moderate: 49,
  high: 74,
  critical: 100,
} as const;

export const scoreWeights = {
  allUrls: 30,
  elevatedPermission: 15,
  tabs: 8,
  storage: 2,
  manyPermissions: 10,
  disabledReduction: -5,
  developmentInstall: 8,
} as const;

export const sensitivityMultipliers: Record<SensitivityLevel, number> = {
  relaxed: 0.85,
  balanced: 1,
  strict: 1.15,
};
