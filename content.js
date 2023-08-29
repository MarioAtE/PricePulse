document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['amount'], (data) => {
    const specificPrice = data.amount || 'R349';
    const regex = new RegExp(`\\b${specificPrice}(\\.00)?(,00)?\\b`, 'g');
    const bodyText = document.body.innerText;
    const matches = bodyText.match(regex);
    if (matches && matches.length > 0) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Price Found',
        message: `Price found: ${specificPrice}`
      });
      chrome.runtime.sendMessage({command: "clearAlarm"});
    }
  });
});
