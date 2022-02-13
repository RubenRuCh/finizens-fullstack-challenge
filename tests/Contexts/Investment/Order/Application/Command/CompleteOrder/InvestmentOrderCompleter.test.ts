import { InvestmentOrderCompleter } from './../../../../../../../src/Contexts/Investment/Order/Application/Command/CompleteOrder/InvestmentOrderCompleter';
import { InvestmentOrderRepositoryMock } from '../../../__mocks/InvestmentOrderRepositoryMock';
import { CompleteInvestmentOrderCommandHandler } from '../../../../../../../src/Contexts/Investment/Order/Application/Command/CompleteOrder/CompleteInvestmentOrderCommandHandler';
import EventBusMock from '../../../../../Shared/__mocks/EventBusMock';
import { CompleteInvestmentOrderCommandMother } from './CompleteInvestmentOrderCommandMother';
import { InvestmentOrderMother } from '../../../Domain/Model/InvestmentOrderMother';
import { InvestmentOrderCompleted } from '../../../../../../../src/Contexts/Investment/Order/Domain/Event/Order/InvestmentOrderCompleted';
import { InvestmentOrderNotFoundException } from '../../../../../../../src/Contexts/Investment/Order/Domain/Exception/InvestmentOrderNotFoundException';
import { InvestmentOrderAlreadyCompletedException } from '../../../../../../../src/Contexts/Investment/Order/Domain/Exception/InvestmentOrderAlreadyCompletedException';

let repository: InvestmentOrderRepositoryMock;
let handler: CompleteInvestmentOrderCommandHandler;

let eventBus: EventBusMock;

describe('InvestmentOrderCompleter.test', () => {
  beforeEach(() => {
    eventBus = new EventBusMock();
    repository = new InvestmentOrderRepositoryMock();

    const completer = new InvestmentOrderCompleter(repository, eventBus);
    handler = new CompleteInvestmentOrderCommandHandler(completer);
  });

  describe('Order type sell', () => {
    it('should complete a order', async () => {
      const order = InvestmentOrderMother.pendingSell();
      const command = CompleteInvestmentOrderCommandMother.createFromOrder(order);
  
      repository.whenSearchThenReturn(order);
  
      await handler.handle(command);
  
      repository.assertLastSavedOrderIs(order);
      eventBus.assertLastPublishedEventIs(new InvestmentOrderCompleted({ order: order.toDTO() }));
    });
  
    it('should throw an exception when trying to complete an order that was already completed', async () => {
      const order = InvestmentOrderMother.completedSell();
      const command = CompleteInvestmentOrderCommandMother.createFromOrder(order);
  
      repository.whenSearchThenReturn(order);
  
      expect.assertions(2);
      try {
        await handler.handle(command);
  
      } catch (error: any) {
        expect(error).toBeInstanceOf(InvestmentOrderAlreadyCompletedException);
        expect(error.message).toBe(command.id);
      }
    });
  });

  describe('Order type buy', () => {
    it('should complete a order', async () => {
      const order = InvestmentOrderMother.pendingBuy();
      const command = CompleteInvestmentOrderCommandMother.createFromOrder(order);
  
      repository.whenSearchThenReturn(order);
  
      await handler.handle(command);
  
      repository.assertLastSavedOrderIs(order);
      eventBus.assertLastPublishedEventIs(new InvestmentOrderCompleted({ order: order.toDTO() }));
    });
  
    it('should throw an exception when trying to complete an order that was already completed', async () => {
      const order = InvestmentOrderMother.completedBuy();
      const command = CompleteInvestmentOrderCommandMother.createFromOrder(order);
  
      repository.whenSearchThenReturn(order);
  
      expect.assertions(2);
      try {
        await handler.handle(command);
  
      } catch (error: any) {
        expect(error).toBeInstanceOf(InvestmentOrderAlreadyCompletedException);
        expect(error.message).toBe(command.id);
      }
    });
  });

  it('should throw an exception when trying to complete an order that does not exist', async () => {
    const command = CompleteInvestmentOrderCommandMother.random();

    repository.whenSearchThenReturn(null);

    expect.assertions(2);
    try {
      await handler.handle(command);

    } catch (error: any) {
      expect(error).toBeInstanceOf(InvestmentOrderNotFoundException);
      expect(error.message).toBe(command.id);
    }
  });
});
