chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['refreshRate'], (data) => {
    const rate = parseFloat(data.refreshRate) || 1;
    chrome.alarms.get('refreshPage', (alarm) => {
      if (!alarm) {
        chrome.alarms.create('refreshPage', {
          delayInMinutes: rate,
          periodInMinutes: rate
        });
      }
    });
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.sync.get(['siteUrl'], (data) => {
    const siteUrl = data.siteUrl || 'https://www.example.com/';
    chrome.tabs.query({ url: siteUrl }, (tabs) => {
      if (tabs.length > 0) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          files: ['content.js']
        });
      }
    });
  });
});
