import { InvestmentOrder } from './../../../Domain/Model/InvestmentOrder';

export class SearchInvestmentOrdersResponse {
  readonly orders: InvestmentOrder[];

  constructor(orders: InvestmentOrder[]) {
    this.orders = orders;
  }
}
  