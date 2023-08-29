document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['amount', 'site'], (data) => {
    const specificWordOrAmount = data.amount || 'R349';
    const site = data.site || '';

    if (window.location.href.startsWith(site)) {
      const regex = new RegExp(`\\b${specificWordOrAmount}\\b`, 'g');
      const bodyText = document.body.innerText;
      const matches = bodyText.match(regex);

      if (matches && matches.length > 0) {
        alert(`Word/Amount found: ${specificWordOrAmount}`);
        chrome.runtime.sendMessage({command: "clearAlarm"});
      }
    }
  });
});
