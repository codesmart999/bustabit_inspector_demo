import { Message } from "@/types";
import { log } from "@/utils";

log('[Background]: script loaded.');

// Function to make API calls and handle errors
const makeAPICall = (url: string, method: string, bodyData: any, sendResponse: (data: any) => void) => {
  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(sendResponse)
  .catch(sendResponse);
};

// Listen for messages from the frontend
chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
  switch (message.type) {
    case "GameEnded":
      // Call the API to store game ended data
      makeAPICall(
        'http://localhost:3000/notify',
        'POST',
        {
          game_id: message.payload.gameId,
          crash_value: message.payload.crashValue,
          balance: message.payload.balance
        },
        sendResponse
      );
      break;
    default:
      console.log(`Message received from ${sender.tab ? "a content script:" + sender.tab.url : "the extension"}.`);
      // Respond with a default result
      sendResponse({ result: 0 });
  }

  // Return true to indicate that sendResponse will be called asynchronously
  return true;
});