import { describe, expect, it } from "vitest";
import { SaveSettings } from "@/core/use-cases/SaveSettings";
import { defaultSettings } from "@/core/constants/appConfig";

describe("SaveSettings", () => {
  it("delegates persistence and returns validated settings", async () => {
    const repository = {
      save: async (settings: typeof defaultSettings) => settings,
    };
    const useCase = new SaveSettings(repository as never);

    const result = await useCase.execute({ ...defaultSettings, showDisabled: false });

    expect(result.showDisabled).toBe(false);
  });
});
