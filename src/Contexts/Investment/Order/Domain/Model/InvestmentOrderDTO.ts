import { InvestmentOrderStatusValue } from '../ValueObject/InvestmentOrderStatus';
import { InvestmentOrderTypeValue } from '../ValueObject/InvestmentOrderType';

export interface InvestmentOrderDTO  {
  id: string;
  portfolioId: string;
  allocationId: string;
  shares: number;
  type: InvestmentOrderTypeValue;
  status: InvestmentOrderStatusValue;
}
