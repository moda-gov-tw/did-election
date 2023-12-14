"use client"
import VotePage from "@/components/layout/votePage"
import { getConfig } from "@/utils/ethereum"
import { WagmiConfig } from "wagmi"
const wagmiConfig = getConfig()

export default function Home() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <VotePage useDiD />
    </WagmiConfig>
  )
}
