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
  if (alarm.name === 'refreshPage') {
    chrome.storage.sync.get(['site'], (data) => {
      const site = data.site || '';
      chrome.tabs.query({url: site + "*"}, (tabs) => {
        if (tabs.length > 0 && tabs[0].id) {
          chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: () => {
              location.reload();
            }
          });
        }
      });
    });
  }
});
