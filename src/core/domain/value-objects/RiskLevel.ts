export const riskLevels = ["low", "moderate", "high", "critical"] as const;

export type RiskLevel = (typeof riskLevels)[number];
