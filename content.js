document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['amount'], (data) => {
    const specificPrice = data.amount || 'R349';
    const regex = new RegExp(`\\b${specificPrice}\\b`, 'g');
    const bodyText = document.body.innerText;
    const matches = bodyText.match(regex);

    if (matches && matches.length > 0) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Price Found',
        message: `Price found: ${specificPrice}`
      });
      chrome.action.setBadgeText({text: ''});
      chrome.runtime.sendMessage({command: "clearAlarm"});
    } else {
      chrome.action.setBadgeText({text: 'NF'});
    }
  });
});
