import { ManagementAdapter } from "@/chrome/adapters/management.adapter";
import { mapChromeExtensionToEntity } from "@/chrome/mappers/chromeExtension.mapper";
import { RiskEngine } from "@/core/services/RiskEngine";
import { RecommendationEngine } from "@/core/services/RecommendationEngine";
import { SettingsRepository } from "@/storage/repositories/SettingsRepository";
import type { ExtensionEntity } from "@/core/domain/types/extension.types";

export class GetInstalledExtensions {
  constructor(
    private readonly management = new ManagementAdapter(),
    private readonly settingsRepository = new SettingsRepository(),
    private readonly riskEngine = new RiskEngine(),
    private readonly recommendationEngine = new RecommendationEngine(),
  ) {}

  async execute(): Promise<ExtensionEntity[]> {
    const [extensions, settings] = await Promise.all([
      this.management.getAll(),
      this.settingsRepository.get(),
    ]);

    return extensions
      .filter((extension) => settings.showSystemExtensions || extension.type !== "theme")
      .filter((extension) => settings.showDisabled || extension.enabled)
      .filter((extension) => !settings.ignoredExtensionIds.includes(extension.id))
      .map((extension) => {
        const base = mapChromeExtensionToEntity(extension);
        const analysis = this.riskEngine.analyze(base, settings);
        const analyzed = {
          ...base,
          riskScore: analysis.score,
          riskLevel: analysis.riskLevel,
          riskReasons: analysis.reasons,
          recommendation: "",
        };

        return {
          ...analyzed,
          recommendation: this.recommendationEngine.getRecommendation(analyzed),
        };
      })
      .sort((left, right) => right.riskScore - left.riskScore);
  }
}
