import { scoreThresholds, scoreWeights, sensitivityMultipliers } from "@/core/constants/riskRules";
import type { ExtensionEntity } from "@/core/domain/types/extension.types";
import type { SettingsEntity } from "@/core/domain/types/settings.types";
import type { RiskLevel } from "@/core/domain/value-objects/RiskLevel";
import { clampScore } from "@/shared/utils/score";

export interface RiskAnalysis {
  score: number;
  riskLevel: RiskLevel;
  reasons: string[];
}

export class RiskEngine {
  analyze(extension: Pick<ExtensionEntity, "permissions" | "hostPermissions" | "enabled" | "installType">, settings: SettingsEntity): RiskAnalysis {
    let score = 0;
    const reasons: string[] = [];
    const totalPermissions = extension.permissions.length + extension.hostPermissions.length;

    if (extension.hostPermissions.includes("<all_urls>")) {
      score += scoreWeights.allUrls;
      reasons.push("Possui acesso amplo a praticamente todos os sites.");
    }

    if (extension.permissions.some((permission) => ["management", "scripting"].includes(permission))) {
      score += scoreWeights.elevatedPermission;
      reasons.push("Inclui capacidades elevadas, como gerenciamento de extensões ou execução de scripts.");
    }

    if (extension.permissions.includes("tabs")) {
      score += scoreWeights.tabs;
      reasons.push("Pode inspecionar abas abertas e contexto de navegação.");
    }

    if (extension.permissions.includes("storage")) {
      score += scoreWeights.storage;
      reasons.push("Armazena dados locais no navegador.");
    }

    if (totalPermissions >= 8) {
      score += scoreWeights.manyPermissions;
      reasons.push("Solicita um volume elevado de permissões combinadas.");
    }

    if (!extension.enabled) {
      score += scoreWeights.disabledReduction;
      reasons.push("Está desabilitada no momento, reduzindo a exposição imediata.");
    }

    if (extension.installType === "development") {
      score += scoreWeights.developmentInstall;
      reasons.push("Foi carregada em modo de desenvolvimento.");
    }

    score = clampScore(score * sensitivityMultipliers[settings.riskSensitivity]);

    return {
      score,
      riskLevel: this.toRiskLevel(score),
      reasons,
    };
  }

  toRiskLevel(score: number): RiskLevel {
    if (score <= scoreThresholds.low) return "low";
    if (score <= scoreThresholds.moderate) return "moderate";
    if (score <= scoreThresholds.high) return "high";
    return "critical";
  }
}
