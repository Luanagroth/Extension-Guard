import { SidePanelAdapter } from "@/chrome/adapters/sidePanel.adapter";

export const registerOnInstalledListener = () => {
  chrome.runtime.onInstalled.addListener(async () => {
    const sidePanel = new SidePanelAdapter();
    await sidePanel.configure("src/app/sidepanel/index.html");
  });
};
