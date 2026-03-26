import type { RiskLevel } from "../value-objects/RiskLevel";

export type ExtensionType =
  | "extension"
  | "hosted_app"
  | "package_app"
  | "legacy_packaged_app"
  | "theme"
  | "login_screen_extension";

export type InstallType = "admin" | "development" | "normal" | "sideload" | "other";

export interface ExtensionEntity {
  id: string;
  name: string;
  shortName: string;
  description: string;
  version: string;
  enabled: boolean;
  type: ExtensionType;
  installType: InstallType;
  homepageUrl?: string;
  icons: string[];
  permissions: string[];
  hostPermissions: string[];
  riskScore: number;
  riskLevel: RiskLevel;
  riskReasons: string[];
  recommendation: string;
}
