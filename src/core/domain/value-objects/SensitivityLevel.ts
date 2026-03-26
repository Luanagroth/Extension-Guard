export const sensitivityLevels = ["relaxed", "balanced", "strict"] as const;

export type SensitivityLevel = (typeof sensitivityLevels)[number];
