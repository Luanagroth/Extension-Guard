import { describe, expect, it } from "vitest";
import { RunAudit } from "@/core/use-cases/RunAudit";
import { AuditComposer } from "@/core/services/AuditComposer";

describe("RunAudit", () => {
  it("composes and persists an audit", async () => {
    const getInstalledExtensions = {
      execute: async () => [
        {
          id: "1",
          name: "Alpha",
          shortName: "Alpha",
          description: "desc",
          version: "1.0.0",
          enabled: true,
          type: "extension",
          installType: "normal",
          homepageUrl: undefined,
          icons: [],
          permissions: [],
          hostPermissions: [],
          riskScore: 10,
          riskLevel: "low",
          riskReasons: [],
          recommendation: "safe",
        },
      ],
    };
    const repository = {
      save: async (audit: { totalExtensions: number; averageScore: number }) => audit,
    };

    const useCase = new RunAudit(getInstalledExtensions as never, new AuditComposer(), repository as never);
    const result = await useCase.execute();

    expect(result.totalExtensions).toBe(1);
    expect(result.averageScore).toBe(10);
  });
});
