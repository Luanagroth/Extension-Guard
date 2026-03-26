import { describe, expect, it } from "vitest";
import { PermissionExplainer } from "@/core/services/PermissionExplainer";

describe("PermissionExplainer", () => {
  it("returns curated metadata for known permissions", () => {
    const explainer = new PermissionExplainer();
    const result = explainer.explain("management");

    expect(result.label).toBe("Gerenciamento de extensões");
    expect(result.sensitivity).toBe("strict");
  });

  it("returns fallback messaging for unknown permissions", () => {
    const explainer = new PermissionExplainer();
    const result = explainer.explain("mystery_permission");

    expect(result.key).toBe("mystery_permission");
    expect(result.humanDescription).toContain("ainda não possui descrição");
  });
});
