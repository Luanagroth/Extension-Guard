import type { SensitivityLevel } from "../value-objects/SensitivityLevel";

export interface PermissionEntity {
  key: string;
  label: string;
  technicalDescription: string;
  humanDescription: string;
  sensitivity: SensitivityLevel;
  recommendation: string;
}
