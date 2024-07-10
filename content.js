let tidderEnabled = true;

function isMixedText(text) {
  const arabicPattern = /[\u0600-\u06FF]/;
  const englishPattern = /[a-zA-Z]/;
  return arabicPattern.test(text) && englishPattern.test(text);
}

function adjustDirection() {
  const headerElements = document.querySelectorAll('[id*="post-title"]');
  const postElements = document.querySelectorAll('[id*="rtjson-content"]');
  headerElements.forEach(element => {
    const textContent = element.innerText;
    if (isMixedText(textContent)) {
      element.style.direction = 'rtl';
    }
  });
  postElements.forEach(element => {
    const pElement = element.querySelector('p');
    const textContent = pElement ? pElement.innerText : '';
    if (isMixedText(textContent)) {
      element.style.direction = 'rtl';
    }
  });
}

function enableTidder() {
  if (!tidderEnabled) {
    adjustDirection();
    const observer = new MutationObserver(adjustDirection);
    observer.observe(document.body, { childList: true, subtree: true });
    tidderEnabled = true;
  }
}

function disableTidder() {
  if (tidderEnabled) {
    const allElements = document.querySelectorAll('[id*="post-title"], [id*="rtjson-content"]');
    allElements.forEach(element => {
      element.style.direction = ''; // Reset direction
    });
    tidderEnabled = false;
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.command === 'toggle_tidder') {
    if (tidderEnabled) {
      disableTidder();
    } else {
      enableTidder();
    }
  }
});
if(enableTidder) adjustDirection();