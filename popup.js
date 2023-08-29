document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['refreshRate', 'amount', 'site'], (data) => {
    document.getElementById('refreshRate').value = data.refreshRate || 1;
    document.getElementById('amount').value = data.amount || 'R349';
    document.getElementById('site').value = data.site || '';
  });

  document.getElementById('save').addEventListener('click', () => {
    const refreshRate = document.getElementById('refreshRate').value;
    const amount = document.getElementById('amount').value;
    const site = document.getElementById('site').value;

    chrome.storage.sync.set({ refreshRate, amount, site }, () => {
      alert('Settings saved successfully.');
      chrome.alarms.clear('refreshPage', () => {
        chrome.alarms.create('refreshPage', {
          delayInMinutes: parseFloat(refreshRate),
          periodInMinutes: parseFloat(refreshRate)
        });
      });
    });
  });
});
