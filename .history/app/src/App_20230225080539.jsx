import { useMemo } from "react"
import { BlogProvider } from "src/context/Blog"
import { Router } from "src/router"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import "./App.css"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets"


export const App = () => {

const endpoint = "https://broken-solemn-isle.solana-devnet.discover.quiknode.pro/ea6c6086c02e4500cf2605287b4a7bdf68f6a1ce/";

const wallets = useMemo(
  () =>[
    new PhantomWalletAdapter(),
  ],
  []
)

  return (
    
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
            <BlogProvider>
              <Router />
            </BlogProvider>
        </WalletProvider>
      </ConnectionProvider>
      
  )
}
