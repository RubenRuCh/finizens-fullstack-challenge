import { Query } from '../../Domain/CQRS/Query/Query';
import { QueryBus } from '../../Domain/CQRS/Query/QueryBus';
import { QueryHandlersInformation } from './QueryHandlersInformation';
import { QueryResponse } from '../../Domain/CQRS/Query/QueryResponse';

export class InMemoryQueryBus implements QueryBus {
  constructor(private queryHandlersInformation: QueryHandlersInformation) {}

  async ask<R extends QueryResponse>(query: Query): Promise<R> {
    const handler = this.queryHandlersInformation.search(query);

    return handler.handle(query) as Promise<R>;
  }
}
