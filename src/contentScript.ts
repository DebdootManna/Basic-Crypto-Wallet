// Content script for webpage interaction
console.log('Crypto wallet content script loaded');

// Listen for webpage requests
window.addEventListener('message', (event) => {
  if (event.data.type === 'CONNECT_WALLET') {
    chrome.runtime.sendMessage({ type: 'GET_WALLET_ADDRESS' }, (response) => {
      window.postMessage({ 
        type: 'WALLET_ADDRESS',
        address: response.address 
      }, '*');
    });
  }
});