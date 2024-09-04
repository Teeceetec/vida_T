import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
  darkTheme,
} from "@rainbow-me/rainbowkit";

import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";

//importing the chains we need (here, just Sepolia)
import {
  sepolia
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const { wallets } = getDefaultWallets();

export const config = getDefaultConfig({
  appName: "Vida dapp",
  projectId: "a1a05b64e17f9e7253c228ab30e0f01c",
  // the above value needs to be replaced
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [
   sepolia
  ],
  ssr: true,
});

// TanStack Query is a library that makes it very easy to fetch, cache and handle data.
// It gives you declarative, always-up-to-date auto-managed queries and mutations.
export const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <WagmiProvider config={config}>
           <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme()}>
                      <App />
       </RainbowKitProvider>
   </QueryClientProvider>
 </WagmiProvider>
  </StrictMode>,
 
)
