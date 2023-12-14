export const ShortenAddr = ({ addr }: { addr: string }) => addr.slice(0, 4) + "..." + addr.slice(-4)
