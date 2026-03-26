import { describe, expect, it } from "vitest";
import { RecommendationEngine } from "@/core/services/RecommendationEngine";

describe("RecommendationEngine", () => {
  it("maps risk levels to contextual guidance", () => {
    const engine = new RecommendationEngine();

    expect(
      engine.getRecommendation({
        riskLevel: "critical",
        riskScore: 90,
        permissions: ["management"],
        hostPermissions: ["<all_urls>"],
        enabled: true,
      }),
    ).toContain("considere remover");
    expect(
      engine.getRecommendation({
        riskLevel: "high",
        riskScore: 65,
        permissions: ["tabs"],
        hostPermissions: [],
        enabled: true,
      }),
    ).toContain("revisão prioritária");
    expect(
      engine.getRecommendation({
        riskLevel: "moderate",
        riskScore: 35,
        permissions: [],
        hostPermissions: [],
        enabled: true,
      }),
    ).toContain("finalidade");
    expect(
      engine.getRecommendation({
        riskLevel: "low",
        riskScore: 10,
        permissions: [],
        hostPermissions: [],
        enabled: false,
      }),
    ).toContain("desabilitada");
  });
});
