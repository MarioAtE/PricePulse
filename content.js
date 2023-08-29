document.addEventListener('DOMContentLoaded', () => {
  // Fetch user-defined settings
  chrome.storage.sync.get(['amount'], (data) => {
    const specificPrice = data.amount || 'R349';
    const regex = new RegExp(`\\b${specificPrice}\\b`, 'g');

    // Scan the entire page text for the specific price
    const bodyText = document.body.innerText;
    const matches = bodyText.match(regex);

    // Action to take if the price is found
    if (matches && matches.length > 0) {
      alert(`Price found: ${specificPrice}`);
      chrome.runtime.sendMessage({command: "clearAlarm"});
    }
    // If not found, the page will be refreshed based on the background.js alarm
  });
});
