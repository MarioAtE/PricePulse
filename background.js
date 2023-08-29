chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['refreshRate'], (data) => {
    const rate = parseFloat(data.refreshRate) || 1;
    chrome.alarms.create('refreshPage', {
      delayInMinutes: rate,
      periodInMinutes: rate
    });
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.action.setBadgeText({text: 'RUN'});
  
  chrome.storage.sync.get(['siteUrl'], (data) => {
    const siteUrl = data.siteUrl || 'https://www.example.com/';
    chrome.tabs.query({ url: siteUrl }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          files: ['content.js']
        }, () => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            chrome.action.setBadgeText({text: 'ERR'});
          }
        });
      } else {
        chrome.action.setBadgeText({text: 'NF'});
      }
    });
  });
});
