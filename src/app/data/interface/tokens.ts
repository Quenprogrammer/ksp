export interface TokenInterface {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: number;
  circulatingSupply?: number;
  creator: string;
  roles: {
    manager: string;
    reserve: string;
    freeze: string;
    clawback: string;
  };
  latestPrice: number;
  liquidityUSD: number;
  priceHistory: {
    price: number;
    date: string;
    time: string;
    user: string;
  }[];
}
