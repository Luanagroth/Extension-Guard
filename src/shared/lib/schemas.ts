import { z } from "zod";
import { riskLevels } from "@/core/domain/value-objects/RiskLevel";
import { sensitivityLevels } from "@/core/domain/value-objects/SensitivityLevel";

const extensionTypes = ["extension", "hosted_app", "package_app", "legacy_packaged_app", "theme", "login_screen_extension"] as const;
const installTypes = ["admin", "development", "normal", "sideload", "other"] as const;

export const extensionSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string(),
  description: z.string(),
  version: z.string(),
  enabled: z.boolean(),
  type: z.enum(extensionTypes),
  installType: z.enum(installTypes),
  homepageUrl: z.string().optional(),
  icons: z.array(z.string()),
  permissions: z.array(z.string()),
  hostPermissions: z.array(z.string()),
  riskScore: z.number(),
  riskLevel: z.enum(riskLevels),
  riskReasons: z.array(z.string()),
  recommendation: z.string(),
});

export const auditSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  totalExtensions: z.number(),
  lowCount: z.number(),
  moderateCount: z.number(),
  highCount: z.number(),
  criticalCount: z.number(),
  averageScore: z.number(),
  items: z.array(extensionSchema),
});

export const settingsSchema = z.object({
  showDisabled: z.boolean(),
  showSystemExtensions: z.boolean(),
  autoRunAuditOnOpen: z.boolean(),
  riskSensitivity: z.enum(sensitivityLevels),
  ignoredExtensionIds: z.array(z.string()),
});

export const auditHistorySchema = z.array(auditSchema);
export const ignoredExtensionsSchema = z.array(z.string());
