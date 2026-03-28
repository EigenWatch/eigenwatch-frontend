import { http, createConfig } from "wagmi";
import {
  mainnet,
  arbitrum,
  base,
  scroll,
  polygon,
  optimism,
  baseSepolia,
} from "wagmi/chains";

export const networks = [
  mainnet,
  arbitrum,
  base,
  scroll,
  polygon,
  optimism,
  baseSepolia,
] as const;

export const config = createConfig({
  chains: networks,
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [scroll.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [baseSepolia.id]: http(),
  },
});
