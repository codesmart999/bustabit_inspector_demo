export const waitForElementsToLoad = <ReturnType = any>(strSelector: string, timeout: number = 10000) => {
  return new Promise<ReturnType | null>((resolve, reject) => {
    let isResolved = false; // Flag to track whether the promise has been resolved

    // Create a new MutationObserver instance
    const observer = new MutationObserver((mutationsList, observer) => {
      // Check each mutation for target nodes
      for (const mutation of mutationsList) {
        // Check if the mutation added any nodes
        if (mutation.addedNodes.length > 0) {
          // Iterate over added nodes and check if any match the desired selector
          mutation.addedNodes.forEach((node) => {
            if (node instanceof Element) {
              const targetElement = node.querySelector(strSelector);
              if (targetElement && !isResolved) {
                // Call the handleElement function with the target element
                resolve(targetElement as ReturnType);
                isResolved = true; // Set the flag to true
                // Disconnect the observer since the target element is found
                observer.disconnect();
              }
            }
          });
        }
      }
    });

    // Start observing mutations in the document body
    observer.observe(document.body, { childList: true, subtree: true });

    if (timeout) {
      // Set a timeout to reject the promise if the element is not found within the specified time
      setTimeout(() => {
        if (!isResolved) {
          reject(`waitForElementsToLoad() - Target element(${strSelector}) not found.`);
          observer.disconnect(); // Disconnect the observer if the timeout occurs
        }
      }, timeout);
    }
  });
};