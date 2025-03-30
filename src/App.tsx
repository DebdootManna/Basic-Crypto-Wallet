import React, { useState, useEffect } from 'react';
import { Wallet } from 'ethers';
import { WalletIcon, Send, RefreshCw, Settings } from 'lucide-react';
import { encryptWallet, decryptWallet } from './utils/crypto';
import NetworkSelector from './components/NetworkSelector';
import SendForm from './components/SendForm';
import CreateWallet from './components/CreateWallet';

function App() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [network, setNetwork] = useState('ethereum');
  const [showSend, setShowSend] = useState(false);

  useEffect(() => {
    // Load wallet from storage on startup
    chrome.storage.local.get(['encryptedWallet'], (result) => {
      if (result.encryptedWallet) {
        // In a real app, prompt for password here
        const password = 'demo-password'; // Never hardcode in production!
        const decryptedWallet = decryptWallet(result.encryptedWallet, password);
        setWallet(decryptedWallet);
      }
    });
  }, []);

  const createNewWallet = async (password: string) => {
    const newWallet = Wallet.createRandom();
    const encrypted = await encryptWallet(newWallet, password);
    await chrome.storage.local.set({ encryptedWallet: encrypted });
    setWallet(newWallet);
  };

  const refreshBalance = async () => {
    if (!wallet) return;
    // In a real app, fetch real balance from network
    setBalance('1.234 ETH');
  };

  return (
    <div className="w-[360px] min-h-[600px] bg-gray-50">
      <header className="bg-indigo-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WalletIcon className="w-6 h-6" />
            <h1 className="text-xl font-bold">Basic Wallet</h1>
          </div>
          <Settings className="w-5 h-5 cursor-pointer" />
        </div>
      </header>

      <main className="p-4">
        {!wallet ? (
          <CreateWallet onCreateWallet={createNewWallet} />
        ) : (
          <>
            <NetworkSelector
              selectedNetwork={network}
              onNetworkChange={setNetwork}
            />
            
            <div className="mt-6 p-4 bg-white rounded-lg shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Balance</h2>
                <RefreshCw
                  className="w-4 h-4 cursor-pointer text-gray-600"
                  onClick={refreshBalance}
                />
              </div>
              <p className="text-2xl font-bold mt-2">{balance}</p>
              <p className="text-sm text-gray-500 truncate">
                {wallet.address}
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowSend(!showSend)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>

            {showSend && (
              <SendForm
                wallet={wallet}
                onClose={() => setShowSend(false)}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;