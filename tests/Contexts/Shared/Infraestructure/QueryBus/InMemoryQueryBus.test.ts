import { Query } from '../../../../../src/Contexts/Shared/Domain/CQRS/Query/Query';
import { QueryNotRegisteredError } from '../../../../../src/Contexts/Shared/Domain/CQRS/Query/QueryNotRegisteredError';
import { QueryHandlersInformation } from '../../../../../src/Contexts/Shared/Infraestructure/QueryBus/QueryHandlersInformation';
import { QueryHandler } from '../../../../../src/Contexts/Shared/Domain/CQRS/Query/QueryHandler';
import { QueryResponse } from '../../../../../src/Contexts/Shared/Domain/CQRS/Query/QueryResponse';
import { InMemoryQueryBus } from '../../../../../src/Contexts/Shared/Infraestructure/QueryBus/InMemoryQueryBus';

class UnhandledQuery extends Query {
  static QUERY_NAME = 'unhandled.query';
}

class HandledQuery extends Query {
  static QUERY_NAME = 'handled.query';
}

class MyQueryHandler implements QueryHandler<Query, QueryResponse> {
  subscribedTo(): HandledQuery {
    return HandledQuery;
  }

  async handle(query: HandledQuery): Promise<QueryResponse> {return {};}
}

describe('InMemoryQueryBus', () => {
    it('should accepts a query with handler', async () => {
        const handledQuery = new HandledQuery();
        const myQueryHandler = new MyQueryHandler();
        const queryHandlersInformation = new QueryHandlersInformation([myQueryHandler]);
        const queryBus = new InMemoryQueryBus(queryHandlersInformation);

        await queryBus.ask(handledQuery);
    });
    
    it('should throw an error if dispatches a query without handler', async () => {
        const unhandledQuery = new UnhandledQuery();
        const queryHandlersInformation = new QueryHandlersInformation([]);
        const queryBus = new InMemoryQueryBus(queryHandlersInformation);

        expect.assertions(2);
        try {
            await queryBus.ask(unhandledQuery);
        } catch (error: any) {
            expect(error).toBeInstanceOf(QueryNotRegisteredError);
            expect(error.message).toBe(`The query <UnhandledQuery> hasn't a query handler associated`);
        }
    });
});
