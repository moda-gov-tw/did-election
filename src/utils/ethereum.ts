'use client'
import {
  Chain,
  createPublicClient,
  createWalletClient,
  custom,
  http,
  WalletClient,
} from 'viem';
import { mainnet, goerli } from 'viem/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { createConfig } from 'wagmi';

class EthereumProviderNotExistError extends Error {
  constructor() {
    super('Ethereum Provider not exist');
    this.name = 'EthereumProviderNotExistError';
  }
}

class UnsupportChainError extends Error {
  constructor(chain: Chain) {
    super(`Unsupport chain: ${chain.name}`);
    this.name = 'UnsupportChainError';
  }
}

export function getNetworkName(chain: Chain) {
  if (chain.id === mainnet.id) {
    return 'mainnet';
  } else if (chain.id === goerli.id) {
    return 'goerli';
  }
}

export function getChain() {
  const mode = process.env.MODE;
  if (mode === 'production') {
    return mainnet;
  } else {
    return goerli;
  }
}

export function getConfig() {
  const chain = getChain();
  const connector = [
    new InjectedConnector()
  ];

  return createConfig({
    publicClient: createPublicClient({
      chain,
      transport: http(),
    }),
    connectors: connector,
  });
}