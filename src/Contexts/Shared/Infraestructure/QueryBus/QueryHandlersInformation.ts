import { Query } from '../../Domain/CQRS/Query/Query';
import { QueryHandler } from '../../Domain/CQRS/Query/QueryHandler';
import { QueryNotRegisteredError } from '../../Domain/CQRS/Query/QueryNotRegisteredError';
import { QueryResponse } from '../../Domain/CQRS/Query/QueryResponse';

export class QueryHandlersInformation {
  private queryHandlersMap: Map<Query, QueryHandler<Query, QueryResponse>>;

  constructor(queryHandlers: Array<QueryHandler<Query, QueryResponse>>) {
    this.queryHandlersMap = this.formatHandlers(queryHandlers);
  }

  private formatHandlers(
    queryHandlers: Array<QueryHandler<Query, QueryResponse>>
  ): Map<Query, QueryHandler<Query, QueryResponse>> {
    const handlersMap = new Map();

    queryHandlers.forEach(queryHandler => {
      handlersMap.set(queryHandler.subscribedTo(), queryHandler);
    });

    return handlersMap;
  }

  public search(query: Query): QueryHandler<Query, QueryResponse> {
    const queryHandler = this.queryHandlersMap.get(query.constructor);

    if (!queryHandler) {
      throw new QueryNotRegisteredError(query);
    }

    return queryHandler;
  }
}
