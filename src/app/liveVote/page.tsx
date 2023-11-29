'use client'
import VotePage from '@/components/layout/votePage';
import { WagmiConfig } from 'wagmi';
import { getConfig } from '@/utils/ethereum';
const wagmiConfig = getConfig()

export default function Home() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <VotePage useDiD={false} />
    </WagmiConfig>
  )
}
