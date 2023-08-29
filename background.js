// background.js
chrome.runtime.onInstalled.addListener(() => {
  // Initialize storage
  chrome.storage.sync.set({ word: '', refreshRate: 5 });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab, changes) => {
  if (changes.manifest_version === 3 && changeInfo.status === 'complete' && tab.active) {
    // Inject code to scan the page content
    chrome.tabs.executeScript(tabId, {
      code: `document.body.innerText.includes("${word}")`
    }, (results) => {
      if (results && results[0]) {
        chrome.notifications.create({
          title: 'Word/Amount found!',
          message: 'The word or amount you are looking for has been found on this page.',
          icon: 'icon.png',
          type: 'basic'
        });
      } else {
        alert('Scanning started.');
        setTimeout(() => {
          chrome.tabs.reload(tabId);
        }, refreshRate * 1000);
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
