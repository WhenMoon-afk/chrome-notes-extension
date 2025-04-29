document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const notesTextarea = document.getElementById('notes');
  const saveButton = document.getElementById('save-btn');
  const clearButton = document.getElementById('clear-btn');
  const statusDiv = document.getElementById('status');

  // Load saved notes when popup opens
  chrome.storage.local.get(['notes'], function(result) {
    if (result.notes) {
      notesTextarea.value = result.notes;
    }
  });

  // Save notes
  saveButton.addEventListener('click', function() {
    const notes = notesTextarea.value;
    chrome.storage.local.set({notes: notes}, function() {
      statusDiv.textContent = 'Notes saved!';
      setTimeout(function() {
        statusDiv.textContent = '';
      }, 1500);
    });
  });

  // Clear notes
  clearButton.addEventListener('click', function() {
    notesTextarea.value = '';
    chrome.storage.local.remove('notes', function() {
      statusDiv.textContent = 'Notes cleared!';
      setTimeout(function() {
        statusDiv.textContent = '';
      }, 1500);
    });
  });
});