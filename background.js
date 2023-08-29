// Create an alarm once the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['refreshRate'], (data) => {
    const rate = parseFloat(data.refreshRate) || 1;
    chrome.alarms.create('refreshPage', {
      delayInMinutes: rate,
      periodInMinutes: rate
    });
  });
});

// Listen for alarm and refresh the page
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'refreshPage') {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          function: () => {
            location.reload();
          }
        });
      }
    });
  }
});

// Listen for messages from content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === 'clearAlarm') {
    chrome.alarms.clear('refreshPage');
  }
});
