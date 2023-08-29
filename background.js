// background.js
chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.frameUrl === window.location.href && details.isMainFrame) {
    // Inject code to scan the page content
    chrome.tabs.executeScript(details.tabId, {
      code: `document.body.innerText.includes("${word}")`
    }, (results) => {
      if (results && results[0]) {
        chrome.notifications.create({
          title: 'Word/Amount found!',
          message: 'The word or amount you are looking for has been found on this page.',
          icon: 'icon.png',
          type: 'basic'
        });
      }
    });
  }
});

function isWordFound(word) {
  // Inject code to scan the page content
  chrome.tabs.executeScript(tabId, {
    code: `document.body.innerText.includes("${word}")`
  }, (results) => {
    return results && results[0];
  });
}
