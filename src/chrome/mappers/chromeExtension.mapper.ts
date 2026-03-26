import type { ExtensionEntity } from "@/core/domain/types/extension.types";

export const mapChromeExtensionToEntity = (
  item: chrome.management.ExtensionInfo,
): Omit<ExtensionEntity, "riskScore" | "riskLevel" | "riskReasons" | "recommendation"> => ({
  id: item.id,
  name: item.name,
  shortName: item.shortName || item.name,
  description: item.description || "No description provided.",
  version: item.version,
  enabled: item.enabled,
  type: item.type,
  installType: item.installType,
  homepageUrl: item.homepageUrl,
  icons: (item.icons || []).map((icon) => icon.url),
  permissions: item.permissions || [],
  hostPermissions: item.hostPermissions || [],
});
