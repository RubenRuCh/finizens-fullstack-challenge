import { Query } from './Query';
import { QueryResponse } from './QueryResponse';

export interface QueryBus {
  ask<R extends QueryResponse>(query: Query): Promise<R>;
}
