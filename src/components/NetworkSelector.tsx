import React from 'react';

interface NetworkSelectorProps {
  selectedNetwork: string;
  onNetworkChange: (network: string) => void;
}

const networks = [
  { id: 'ethereum', name: 'Ethereum Mainnet' },
  { id: 'goerli', name: 'Goerli Testnet' },
];

const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  selectedNetwork,
  onNetworkChange,
}) => {
  return (
    <div className="w-full">
      <select
        value={selectedNetwork}
        onChange={(e) => onNetworkChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg bg-white"
      >
        {networks.map((network) => (
          <option key={network.id} value={network.id}>
            {network.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NetworkSelector;