import { Message } from "@/types";

// Used in Content and Popup to send message to Background
export const sendMessage = <ReturnType = any>(message: Message) => {
  return new Promise<ReturnType>((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
};

export const sendMessageFromPopupToTab = <ReturnType = any>(objMessage: object) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs: Array<any>) => {
    if (!tabs || !tabs.length)
      return;
    
    chrome.tabs.sendMessage(tabs[0].id, objMessage);
  });
}