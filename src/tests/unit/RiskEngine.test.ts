import { describe, expect, it } from "vitest";
import { RiskEngine } from "@/core/services/RiskEngine";
import { defaultSettings } from "@/core/constants/appConfig";

describe("RiskEngine", () => {
  it("scores broad access and elevated permissions as critical", () => {
    const engine = new RiskEngine();
    const result = engine.analyze(
      {
        permissions: ["management", "tabs", "storage", "alarms", "notifications", "contextMenus", "activeTab"],
        hostPermissions: ["<all_urls>"],
        enabled: true,
        installType: "normal",
      },
      defaultSettings,
    );

    expect(result.score).toBe(65);
    expect(result.riskLevel).toBe("high");
    expect(result.reasons).toContain("Possui acesso amplo a praticamente todos os sites.");
  });

  it("reduces exposure when the extension is disabled", () => {
    const engine = new RiskEngine();
    const result = engine.analyze(
      {
        permissions: ["storage"],
        hostPermissions: [],
        enabled: false,
        installType: "normal",
      },
      defaultSettings,
    );

    expect(result.score).toBe(0);
    expect(result.riskLevel).toBe("low");
  });
});
