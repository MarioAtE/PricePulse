// Add a DOMContentLoaded event to ensure the HTML is fully loaded before running JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Load existing settings from Chrome storage and populate the input fields
  chrome.storage.sync.get(['word', 'refreshRate'], (data) => {
    document.getElementById('word').value = data.word || '';
    document.getElementById('refreshRate').value = data.refreshRate || 5;
  });

  // Attach a click event listener to the 'Save' button
  document.getElementById('save').addEventListener('click', () => {
    // Fetch the word and refresh rate from input fields
    const word = document.getElementById('word').value;
    const refreshRate = document.getElementById('refreshRate').value;

    // Validate the inputs before saving
    if(word && !isNaN(refreshRate)) {
      // Check if the word has been found in the page content
      const isFound = isWordFound(word);

      // Save the settings in Chrome storage
      chrome.storage.sync.set({ word, refreshRate }, () => {
        if(isFound) {
          alert('Word/Amount found.');
        } else {
          alert('Word/Amount not found.');
        }
      });
    } else {
      alert('Please provide valid inputs.');
    }
  });
});
