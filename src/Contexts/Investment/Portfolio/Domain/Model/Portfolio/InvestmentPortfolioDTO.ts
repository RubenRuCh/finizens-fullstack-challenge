import { InvestmentAllocationDTO } from '../Allocation/InvestmentAllocationDTO';

export interface InvestmentPortfolioDTO  {
  id: string;
  allocations: InvestmentAllocationDTO[];
}
