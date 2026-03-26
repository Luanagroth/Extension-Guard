import { useEffect, useState } from "react";
import { RuntimeAdapter } from "@/chrome/adapters/runtime.adapter";
import { defaultSettings } from "@/core/constants/appConfig";
import { messageTypes, type ExtensionGuardResponse } from "@/core/domain/types/message.types";
import type { SettingsEntity } from "@/core/domain/types/settings.types";

const runtime = new RuntimeAdapter();

export const useSettings = () => {
  const [settings, setSettings] = useState<SettingsEntity>(defaultSettings);

  useEffect(() => {
    chrome.storage.local.get("extension-guard:settings").then((result) => {
      if (result["extension-guard:settings"]) {
        setSettings(result["extension-guard:settings"] as SettingsEntity);
      }
    });
  }, []);

  const save = async (next: SettingsEntity) => {
    const response = await runtime.sendMessage<ExtensionGuardResponse>({
      type: messageTypes.SAVE_SETTINGS,
      payload: next,
    });
    const saved = response.data as SettingsEntity;
    setSettings(saved);
    return saved;
  };

  return { settings, save };
};
