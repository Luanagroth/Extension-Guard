import type { ExtensionEntity } from "@/core/domain/types/extension.types";
import type { RiskLevel } from "@/core/domain/value-objects/RiskLevel";

export class RecommendationEngine {
  getRecommendation(extension: Pick<ExtensionEntity, "riskLevel" | "riskScore" | "permissions" | "hostPermissions" | "enabled">): string {
    const signals: string[] = [];

    if (extension.hostPermissions.includes("<all_urls>")) {
      signals.push("o acesso amplo a sites");
    }

    if (extension.permissions.includes("management")) {
      signals.push("o gerenciamento de outras extensões");
    }

    if (extension.permissions.includes("scripting")) {
      signals.push("a execução de scripts em páginas");
    }

    if (extension.permissions.includes("tabs")) {
      signals.push("o acesso ao contexto das abas");
    }

    const signalText = signals.length
      ? ` Atenção especial para ${signals.join(", ")}.`
      : "";

    switch (extension.riskLevel) {
      case "critical":
        return `Revise com urgência e considere remover ou desativar até validar a real necessidade da extensão.${signalText}`;
      case "high":
        return `A extensão merece revisão prioritária para confirmar se as permissões concedidas ainda fazem sentido para o uso diário.${signalText}`;
      case "moderate":
        return `Mantenha somente se a finalidade estiver clara e as permissões forem compatíveis com a proposta funcional.${signalText}`;
      default:
        return extension.enabled
          ? `O risco aparente é baixo, mas continue acompanhando atualizações e mudanças de permissão.${signalText}`
          : "O risco aparente é baixo e a extensão está desabilitada, o que reduz a exposição imediata.";
    }
  }

  getLabel(riskLevel: RiskLevel): string {
    return {
      low: "baixo",
      moderate: "moderado",
      high: "alto",
      critical: "crítico",
    }[riskLevel];
  }
}
