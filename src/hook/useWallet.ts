import { useAccount, useConfig, useDisconnect } from 'wagmi';
import { connect as wagmiConnect, disconnect as wagmiDisconnect } from '@wagmi/core';

export default function useWallet() {
    const { connectors } = useConfig();
    const { address, isConnected } = useAccount();
    const connect = async () => {
        await wagmiConnect({
            connector: connectors[0],
        });
    }
    const disconnect = async () => {
        await wagmiDisconnect();
    }
    return { address, isConnected, trimmed: trimAddr(address), connect, disconnect };
}

function trimAddr(addr: string | undefined) {
    if (!addr) return '';
    return addr.slice(0, 2) + '...' + addr.slice(-4);
}