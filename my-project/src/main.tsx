import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { mainnet, sepolia } from 'wagmi/chains';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import './index.css';

// Create a client for TanStack Query
const queryClient = new QueryClient();

// Configure chains and connectors for Wagmi and RainbowKit
const config = getDefaultConfig({
  appName: 'Your Crowdfunding dApp',
  projectId: 'YOUR_WALLET_CONNECT_PROJECT_ID', // Get one at https://cloud.walletconnect.com
  chains: [sepolia, mainnet],
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
  ssr: true, // Set to true if using Next.js
});

// Render the App
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);