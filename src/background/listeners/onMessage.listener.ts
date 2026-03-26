import { z } from "zod";
import { getAuditHistoryHandler } from "@/background/handlers/getAuditHistory.handler";
import { getExtensionDetailsHandler } from "@/background/handlers/getExtensionDetails.handler";
import { getExtensionsHandler } from "@/background/handlers/getExtensions.handler";
import { runAuditHandler } from "@/background/handlers/runAudit.handler";
import { saveSettingsHandler } from "@/background/handlers/saveSettings.handler";
import { settingsSchema } from "@/shared/lib/schemas";
import { messageTypes, type ExtensionGuardRequest, type ExtensionGuardResponse } from "@/core/domain/types/message.types";

const requestSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal(messageTypes.RUN_AUDIT) }),
  z.object({ type: z.literal(messageTypes.GET_EXTENSIONS) }),
  z.object({ type: z.literal(messageTypes.GET_AUDIT_HISTORY) }),
  z.object({
    type: z.literal(messageTypes.GET_EXTENSION_DETAILS),
    payload: z.object({ extensionId: z.string() }),
  }),
  z.object({
    type: z.literal(messageTypes.SAVE_SETTINGS),
    payload: settingsSchema,
  }),
]);

export const registerOnMessageListener = () => {
  chrome.runtime.onMessage.addListener((message: ExtensionGuardRequest, _sender, sendResponse) => {
    requestSchema
      .parseAsync(message)
      .then(async (request): Promise<ExtensionGuardResponse> => {
        switch (request.type) {
          case messageTypes.RUN_AUDIT:
            return { type: request.type, data: await runAuditHandler() };
          case messageTypes.GET_EXTENSIONS:
            return { type: request.type, data: await getExtensionsHandler() };
          case messageTypes.GET_EXTENSION_DETAILS:
            return {
              type: request.type,
              data: await getExtensionDetailsHandler(request.payload.extensionId),
            };
          case messageTypes.GET_AUDIT_HISTORY:
            return { type: request.type, data: await getAuditHistoryHandler() };
          case messageTypes.SAVE_SETTINGS:
            return { type: request.type, data: await saveSettingsHandler(request.payload) };
        }
      })
      .then((response) => sendResponse(response))
      .catch((error) => sendResponse({ error: error instanceof Error ? error.message : "Unknown error" }));

    return true;
  });
};
