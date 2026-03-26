export class SidePanelAdapter {
  async open(): Promise<void> {
    const currentWindow = await chrome.windows.getCurrent();
    if (!currentWindow.id) {
      return;
    }

    await chrome.sidePanel.open({ windowId: currentWindow.id });
  }

  async configure(path: string): Promise<void> {
    await chrome.sidePanel.setOptions({ enabled: true, path });
  }
}
