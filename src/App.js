import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Button, Web3Modal, Web3NetworkSwitch } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, avalanche, bsc, fantom, gnosis, mainnet, optimism, polygon,goerli,hardhat,celo,canto } from 'wagmi/chains'

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.REACT_APP_PROJECT_ID) {
  throw new Error('You need to provide REACT_APP_PROJECT_ID env variable')
}
const projectId = process.env.REACT_APP_PROJECT_ID

// 2. Configure wagmi client
const chains = [mainnet, polygon, avalanche, arbitrum, gnosis, bsc, optimism, fantom,goerli,hardhat,celo,canto]

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  provider
})

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains)

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoennt
export default function App() {
  return (
    <>
    <h1 style={{display:"flex", justifyContent:"center", margin:'50px, 0px ,0 0px'}}>Connect Wallet</h1>

    <div style={{display:"flex", justifyContent:"center", margin:'10px 0px'}}>
      <WagmiConfig client={wagmiClient}>
        <Web3Button />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
    </>
  )
}
