import type { SensitivityLevel } from "../value-objects/SensitivityLevel";

export interface SettingsEntity {
  showDisabled: boolean;
  showSystemExtensions: boolean;
  autoRunAuditOnOpen: boolean;
  riskSensitivity: SensitivityLevel;
  ignoredExtensionIds: string[];
}
