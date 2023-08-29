document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['refreshRate', 'amount', 'siteUrl'], (data) => {
    document.getElementById('refreshRate').value = data.refreshRate || 1;
    document.getElementById('amount').value = data.amount || 'R349';
    document.getElementById('siteUrl').value = data.siteUrl || 'https://www.example.com/';
  });

  document.getElementById('save').addEventListener('click', () => {
    const refreshRate = document.getElementById('refreshRate').value;
    const amount = document.getElementById('amount').value;
    const siteUrl = document.getElementById('siteUrl').value;

    chrome.storage.sync.set({ refreshRate, amount, siteUrl }, () => {
      alert('Settings saved successfully.');
      chrome.action.setBadgeText({text: 'SET'});
    });
  });
});
