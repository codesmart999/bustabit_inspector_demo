import $ from 'jquery';
import 'jquery-sendkeys';
import { sendMessage } from "@/utils";
import { waitForElementsToLoad, log } from "@/utils";

declare global {
  interface JQuery {
    sendkeys: (keys: string) => JQuery;
  }
}

const objConstants = {
  GAME_HISTORY_CONTAINER: '._previousCrashes_wxzdk_18 tbody',
  BALANCE: '._userInfoBalance_hvhhx_164'
};

$(document).ready(function() {
  log(`[Content Script] is loaded.`);

  const getCurrentBalance = () : number => {
    const textContent = $(objConstants.BALANCE).text().trim();
    const numericValue = textContent.split(' ')[1];
    return Number(numericValue);
  };

  const onGameEnded = (gameId: string, crashValue: string) => {
    const balance = getCurrentBalance() || 0;
    
    sendMessage({type: "GameEnded", payload: {gameId, crashValue, balance}}).then((response) => {
      // console.log('response', response);
    });
  }

  const recordCrashHistory = () => {
    const targetNode = document.querySelector(objConstants.GAME_HISTORY_CONTAINER) as HTMLElement;

    const observer = new MutationObserver((mutationsList, observer) => {
      let bFound = false;
      for (const mutation of mutationsList) {
        if (bFound) break;

        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.tagName.toLowerCase() === 'td') {
              const gameId = (node.querySelector<HTMLAnchorElement>('a')?.getAttribute('href') || '').split('/').pop()?.trim() || '';
              const crashValue = node.querySelector<HTMLAnchorElement>('a')?.textContent?.trim().replace('x', '') || '';

              log(`[Content Script]: Game (${gameId}) - Crashed At (${crashValue})`);

              onGameEnded(gameId, crashValue);

              bFound = true;

              return;
            }
          });
        }
      }
    });

    // Configure and start the observer
    const observerConfig: MutationObserverInit = { childList: true, subtree: true };
    observer.observe(targetNode, observerConfig);
  };

  // Initialize...
  waitForElementsToLoad(`${objConstants.GAME_HISTORY_CONTAINER}`, 0)
    .then(() => {
      recordCrashHistory();
    });
});
