// background.js
chrome.runtime.onInstalled.addListener(() => {
  // Initialize storage
  chrome.storage.sync.set({ word: '', refreshRate: 5 });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    // Inject code to scan the page content
    chrome.tabs.executeScript(tabId, {
      code: `document.body.innerText.includes("${word}")`
    }, (results) => {
      if (results && results[0]) {
        alert('Word/Amount found.');
      } else {
        alert('Scanning started.');
        setTimeout(() => {
          chrome.tabs.reload(tabId);
        }, refreshRate * 1000);
      }
    });
  }
});
