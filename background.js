chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    /^https:\/\/calendar\.google\.com/.test(tab.url)
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: disableButton,
    });

    // Add this code here
    chrome.action.enable(tabId, () => {
      chrome.action.setIcon({ path: "icons/enabled.png", tabId });
      chrome.action.setBadgeText({ text: "ON", tabId });
      chrome.action.setBadgeBackgroundColor({ color: "#fc2d5a", tabId });
    });
  } else {
    // And this code here
    chrome.action.disable(tabId, () => {
      chrome.action.setIcon({ path: "icons/disabled.png", tabId });
      chrome.action.setBadgeText({ text: "", tabId });
    });
  }
});

function disableButton() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        const button = document.getElementById("xRsvpNoBu");
        if (button) {
          button.disabled = true;
          button.style.backgroundColor = "#ffeebb";
          button.style.color = "#b8952c";
          button.style.border = "none";
        }
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
