export class RuntimeAdapter {
  async sendMessage<TResponse>(message: unknown): Promise<TResponse> {
    return chrome.runtime.sendMessage(message) as Promise<TResponse>;
  }

  onMessage(
    listener: Parameters<typeof chrome.runtime.onMessage.addListener>[0],
  ): void {
    chrome.runtime.onMessage.addListener(listener);
  }
}
