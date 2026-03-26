import type { AuditEntity } from "./audit.types";
import type { ExtensionEntity } from "./extension.types";
import type { SettingsEntity } from "./settings.types";

export const messageTypes = {
  RUN_AUDIT: "RUN_AUDIT",
  GET_EXTENSIONS: "GET_EXTENSIONS",
  GET_EXTENSION_DETAILS: "GET_EXTENSION_DETAILS",
  GET_AUDIT_HISTORY: "GET_AUDIT_HISTORY",
  SAVE_SETTINGS: "SAVE_SETTINGS",
} as const;

export type MessageType = (typeof messageTypes)[keyof typeof messageTypes];

export type ExtensionGuardRequest =
  | { type: typeof messageTypes.RUN_AUDIT }
  | { type: typeof messageTypes.GET_EXTENSIONS }
  | { type: typeof messageTypes.GET_EXTENSION_DETAILS; payload: { extensionId: string } }
  | { type: typeof messageTypes.GET_AUDIT_HISTORY }
  | { type: typeof messageTypes.SAVE_SETTINGS; payload: SettingsEntity };

export type ExtensionGuardResponse =
  | { type: typeof messageTypes.RUN_AUDIT; data: AuditEntity }
  | { type: typeof messageTypes.GET_EXTENSIONS; data: ExtensionEntity[] }
  | { type: typeof messageTypes.GET_EXTENSION_DETAILS; data: ExtensionEntity | null }
  | { type: typeof messageTypes.GET_AUDIT_HISTORY; data: AuditEntity[] }
  | { type: typeof messageTypes.SAVE_SETTINGS; data: SettingsEntity };
