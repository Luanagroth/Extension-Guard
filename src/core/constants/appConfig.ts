import type { SettingsEntity } from "@/core/domain/types/settings.types";

export const storageKeys = {
  settings: "extension-guard:settings",
  auditHistory: "extension-guard:audit-history",
  ignoredExtensions: "extension-guard:ignored-extensions",
  latestAudit: "extension-guard:latest-audit",
} as const;

export const defaultSettings: SettingsEntity = {
  showDisabled: true,
  showSystemExtensions: false,
  autoRunAuditOnOpen: true,
  riskSensitivity: "balanced",
  ignoredExtensionIds: [],
};
