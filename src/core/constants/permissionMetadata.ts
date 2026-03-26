import type { PermissionEntity } from "@/core/domain/entities/PermissionEntity";

export const permissionMetadata: Record<string, PermissionEntity> = {
  management: {
    key: "management",
    label: "Gerenciamento de extensões",
    technicalDescription: "Allows an extension to inspect, enable, disable or uninstall other extensions.",
    humanDescription: "Esta extensão pode visualizar e gerenciar outras extensões instaladas no navegador.",
    sensitivity: "strict",
    recommendation: "Mantenha ativa apenas se você confiar no desenvolvedor e realmente precisar desse nível de controle.",
  },
  tabs: {
    key: "tabs",
    label: "Abas do navegador",
    technicalDescription: "Allows access to tab metadata such as URL, title and status.",
    humanDescription: "Esta extensão pode ver informações sobre as abas abertas, como título e endereço.",
    sensitivity: "balanced",
    recommendation: "Verifique se esse acesso é compatível com a finalidade principal da extensão.",
  },
  scripting: {
    key: "scripting",
    label: "Execução de scripts",
    technicalDescription: "Allows code injection into pages when combined with host access.",
    humanDescription: "Esta extensão pode executar código dentro dos sites acessados.",
    sensitivity: "strict",
    recommendation: "Só mantenha se a modificação de páginas fizer parte clara da proposta da extensão.",
  },
  storage: {
    key: "storage",
    label: "Armazenamento local",
    technicalDescription: "Allows the extension to persist local settings and cached data.",
    humanDescription: "Esta extensão pode salvar preferências e dados locais no navegador.",
    sensitivity: "relaxed",
    recommendation: "Normalmente é esperado, mas vale analisar junto com permissões mais sensíveis.",
  },
  "<all_urls>": {
    key: "<all_urls>",
    label: "Todos os sites",
    technicalDescription: "Grants host access to every supported URL pattern in the browser.",
    humanDescription: "Esta extensão pode interagir com praticamente todos os sites que você visita.",
    sensitivity: "strict",
    recommendation: "Trate como acesso de alto impacto e mantenha somente se isso for realmente necessário.",
  },
};
