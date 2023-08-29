// Load DOM content before executing script
document.addEventListener('DOMContentLoaded', () => {
  // Load saved settings and populate the input fields
  chrome.storage.sync.get(['refreshRate', 'amount'], (data) => {
    document.getElementById('refreshRate').value = data.refreshRate || 1;
    document.getElementById('amount').value = data.amount || 'R349';
  });

  // Save the user-defined settings when the "Save" button is clicked
  document.getElementById('save').addEventListener('click', () => {
    const refreshRate = document.getElementById('refreshRate').value;
    const amount = document.getElementById('amount').value;

    chrome.storage.sync.set({ refreshRate, amount }, () => {
      // Notify the user that the settings were saved successfully
      alert('Settings saved successfully.');

      // Update the refresh rate for the alarm in background.js
      chrome.alarms.clear('refreshPage', () => {
        chrome.alarms.create('refreshPage', {
          delayInMinutes: parseFloat(refreshRate),
          periodInMinutes: parseFloat(refreshRate)
        });
      });
    });
  });
});
