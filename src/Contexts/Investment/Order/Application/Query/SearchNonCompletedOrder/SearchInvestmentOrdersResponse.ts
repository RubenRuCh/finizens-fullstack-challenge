import { InvestmentOrderDTO } from './../../../Domain/Model/InvestmentOrderDTO';
import { QueryResponse } from './../../../../../Shared/Domain/CQRS/Query/QueryResponse';

export class SearchInvestmentOrdersResponse implements QueryResponse {
  readonly orders: InvestmentOrderDTO[];

  constructor(orders: InvestmentOrderDTO[]) {
    this.orders = orders;
  }
}
