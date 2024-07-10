const toggleButton = document.getElementById('toggleButton');
toggleButton.addEventListener('click', function() {

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { command: 'toggle_tidder' });
  });
});
