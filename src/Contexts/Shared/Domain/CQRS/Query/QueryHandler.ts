import { Query } from './Query';
import { QueryResponse } from './QueryResponse';

export interface QueryHandler<Q extends Query, R extends QueryResponse> {
  subscribedTo(): Query;
  handle(query: Q): Promise<R>;
}
