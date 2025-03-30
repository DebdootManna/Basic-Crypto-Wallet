// Background script for handling extension events
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_WALLET_ADDRESS') {
    chrome.storage.local.get(['walletAddress'], (result) => {
      sendResponse({ address: result.walletAddress });
    });
    return true;
  }
});