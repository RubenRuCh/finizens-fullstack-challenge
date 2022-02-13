import { QueryResponse } from './../../../../../Shared/Domain/CQRS/Query/QueryResponse';
import { InvestmentOrder } from './../../../Domain/Model/InvestmentOrder';

export class SearchInvestmentOrdersResponse implements QueryResponse {
  readonly orders: InvestmentOrder[];

  constructor(orders: InvestmentOrder[]) {
    this.orders = orders;
  }
}
