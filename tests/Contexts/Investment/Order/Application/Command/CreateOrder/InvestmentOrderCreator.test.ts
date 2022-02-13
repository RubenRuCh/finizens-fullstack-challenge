import { InvestmentOrderStatusMother } from './../../../Domain/ValueObject/InvestmentOrderStatusMother';
import { InvestmentOrderIdMother } from './../../../Domain/ValueObject/InvestmentOrderIdMother';
import { InvestmentPortfolioRepositoryMock } from './../../../../Portfolio/__mocks/InvestmentPortfolioRepositoryMock';
import { InvestmentOrderRepositoryMock } from '../../../__mocks/InvestmentOrderRepositoryMock';
import { CreateInvestmentOrderCommandHandler } from './../../../../../../../src/Contexts/Investment/Order/Application/Command/CreateOrder/CreateInvestmentOrderCommandHandler';
import EventBusMock from '../../../../../Shared/__mocks/EventBusMock';
import { InvestmentOrderCreator } from '../../../../../../../src/Contexts/Investment/Order/Application/Command/CreateOrder/InvestmentOrderCreator';
import { FindInvestmentPortfolioByIdQueryHandler } from '../../../../../../../src/Contexts/Investment/Portfolio/Application/Query/FindPortfolio/FindInvestmentPortfolioByIdQueryHandler';
import { InvestmentPortfolioFinder } from '../../../../../../../src/Contexts/Investment/Portfolio/Application/Query/FindPortfolio/InvestmentPortfolioFinder';
import { CreateInvestmentOrderCommandMother } from './CreateInvestmentOrderCommandMother';
import { InvestmentOrderMother } from '../../../Domain/Model/InvestmentOrderMother';
import { InvestmentOrderCreated } from '../../../../../../../src/Contexts/Investment/Order/Domain/Event/Order/InvestmentOrderCreated';
import { InvestmentPortfolioMother } from '../../../../Portfolio/Domain/Model/InvestmentPortfolioMother';
import { InvestmentAllocationMother } from '../../../../Portfolio/Domain/Model/InvestmentAllocationMother';
import { InvestmentOrderTypeMother } from '../../../Domain/ValueObject/InvestmentOrderTypeMother';
import { InvestmentShares } from '../../../../../../../src/Contexts/Investment/Shared/Domain/ValueObject/InvestmentShares';
import { InvestmentOrderCannotSellMoreSharesThanAvailableInAllocationException } from '../../../../../../../src/Contexts/Investment/Order/Domain/Exception/InvestmentOrderCannotSellMoreSharesThanAvailableInAllocationException';
import { InvestmentAllocationNotFoundException } from '../../../../../../../src/Contexts/Investment/Portfolio/Domain/Exception/Allocation/InvestmentAllocationNotFoundException';
import { InvestmentPortfolioNotFoundException } from '../../../../../../../src/Contexts/Investment/Portfolio/Domain/Exception/Portfolio/InvestmentPortfolioNotFoundException';

let orderRepository: InvestmentOrderRepositoryMock;
let portfolioRepository: InvestmentPortfolioRepositoryMock;

let findPortfolioHandler: FindInvestmentPortfolioByIdQueryHandler;
let createOrderHandler: CreateInvestmentOrderCommandHandler;

let eventBus: EventBusMock;

describe('InvestmentOrderCreator.test', () => {
  beforeEach(() => {
    eventBus = new EventBusMock();
    orderRepository = new InvestmentOrderRepositoryMock();
    portfolioRepository = new InvestmentPortfolioRepositoryMock();

    const finder = new InvestmentPortfolioFinder(portfolioRepository);
    findPortfolioHandler = new FindInvestmentPortfolioByIdQueryHandler(finder);

    const creator = new InvestmentOrderCreator(orderRepository, findPortfolioHandler, eventBus);
    createOrderHandler = new CreateInvestmentOrderCommandHandler(creator);
  });

  describe('Order type buy', () => {
    it('should create a pending buy order', async () => {
      const command = CreateInvestmentOrderCommandMother.pendingBuy();
      const order = InvestmentOrderMother.fromCommand(command);
  
      await createOrderHandler.handle(command);
  
      orderRepository.assertLastSavedOrderIs(order);
      eventBus.assertLastPublishedEventIs(new InvestmentOrderCreated({ order: order.toDTO() }));
    });
  
    it('should create a pending buy order even if a status completed is sent', async () => {
      const command = CreateInvestmentOrderCommandMother.completedBuy();
      const order = InvestmentOrderMother.fromCommand(command);
  
      const pendingOrder = InvestmentOrderMother.create(
        order.id,
        order.portfolioId,
        order.allocationId,
        order.shares,
        order.type,
        InvestmentOrderStatusMother.pending(),
      );
  
      await createOrderHandler.handle(command);
  
      orderRepository.assertLastSavedOrderIs(pendingOrder);
      eventBus.assertLastPublishedEventIs(new InvestmentOrderCreated({ order: pendingOrder.toDTO() }));
    });
  });

  describe('Order type sell', () => {
    it('should create a valid pending sell order when selling all shares of an allocation', async () => {
      const allocation = InvestmentAllocationMother.random();
      const portfolio = InvestmentPortfolioMother.random();

      portfolio.allocations.push(allocation);

      const sharesToSell = allocation.shares;

      const order = InvestmentOrderMother.create(
        InvestmentOrderIdMother.random(),
        portfolio.id,
        allocation.id,
        sharesToSell,
        InvestmentOrderTypeMother.sell(),
        InvestmentOrderStatusMother.pending(),
      )

      const command = CreateInvestmentOrderCommandMother.createFromOrder(order);
  
      portfolioRepository.whenSearchThenReturn(portfolio);

      await createOrderHandler.handle(command);
  
      orderRepository.assertLastSavedOrderIs(order);
      eventBus.assertLastPublishedEventIs(new InvestmentOrderCreated({ order: order.toDTO() }));
    });

    it('should create a pending sell order even if a status completed is sent', async () => {
      const allocation = InvestmentAllocationMother.random();
      const portfolio = InvestmentPortfolioMother.random();

      portfolio.allocations.push(allocation);

      const sharesToSell = allocation.shares;

      const orderId = InvestmentOrderIdMother.random();

      const order = InvestmentOrderMother.create(
        orderId,
        portfolio.id,
        allocation.id,
        sharesToSell,
        InvestmentOrderTypeMother.sell(),
        InvestmentOrderStatusMother.completed(),
      );

      const pendingOrder = InvestmentOrderMother.create(
        orderId,
        portfolio.id,
        allocation.id,
        sharesToSell,
        InvestmentOrderTypeMother.sell(),
        InvestmentOrderStatusMother.pending(),
      );
  
      const command = CreateInvestmentOrderCommandMother.createFromOrder(order);

      portfolioRepository.whenSearchThenReturn(portfolio);

      await createOrderHandler.handle(command);

      orderRepository.assertLastSavedOrderIs(pendingOrder);
      eventBus.assertLastPublishedEventIs(new InvestmentOrderCreated({ order: pendingOrder.toDTO() }));
    });

    it('should create a valid pending sell order when selling less shares than the total shares the allocation have', async () => {
      const allocation = InvestmentAllocationMother.random();
      const portfolio = InvestmentPortfolioMother.random();

      portfolio.allocations.push(allocation);

      const sharesToSell = new InvestmentShares(allocation.shares.value - 1);

      const order = InvestmentOrderMother.create(
        InvestmentOrderIdMother.random(),
        portfolio.id,
        allocation.id,
        sharesToSell,
        InvestmentOrderTypeMother.sell(),
        InvestmentOrderStatusMother.pending(),
      )

      const command = CreateInvestmentOrderCommandMother.createFromOrder(order);
  
      portfolioRepository.whenSearchThenReturn(portfolio);

      await createOrderHandler.handle(command);
  
      orderRepository.assertLastSavedOrderIs(order);
      eventBus.assertLastPublishedEventIs(new InvestmentOrderCreated({ order: order.toDTO() }));
    });

    it('should throw an exception when trying to sell more shares than the total shares the allocation have', async () => {
      const allocation = InvestmentAllocationMother.random();
      const portfolio = InvestmentPortfolioMother.random();

      portfolio.allocations.push(allocation);

      const sharesToSell = new InvestmentShares(allocation.shares.value + 1);

      const order = InvestmentOrderMother.create(
        InvestmentOrderIdMother.random(),
        portfolio.id,
        allocation.id,
        sharesToSell,
        InvestmentOrderTypeMother.sell(),
        InvestmentOrderStatusMother.pending(),
      )

      const command = CreateInvestmentOrderCommandMother.createFromOrder(order);
  
      portfolioRepository.whenSearchThenReturn(portfolio);

      expect.assertions(2);
      try {
        await createOrderHandler.handle(command);

      } catch (error: any) {
        expect(error).toBeInstanceOf(InvestmentOrderCannotSellMoreSharesThanAvailableInAllocationException);
        expect(error.message).toBe(sharesToSell.value.toString());
      }
    });


    it('should throw an exception when trying to sell shares from an allocation that does not exist in the porfolio', async () => {
      const allocation = InvestmentAllocationMother.random();
      const portfolio = InvestmentPortfolioMother.random();

      const sharesToSell = allocation.shares;

      const order = InvestmentOrderMother.create(
        InvestmentOrderIdMother.random(),
        portfolio.id,
        allocation.id,
        sharesToSell,
        InvestmentOrderTypeMother.sell(),
        InvestmentOrderStatusMother.pending(),
      )

      const command = CreateInvestmentOrderCommandMother.createFromOrder(order);
  
      portfolioRepository.whenSearchThenReturn(portfolio);

      expect.assertions(2);
      try {
        await createOrderHandler.handle(command);

      } catch (error: any) {
        expect(error).toBeInstanceOf(InvestmentAllocationNotFoundException);
        expect(error.message).toBe(allocation.id.value);
      }
    });

    it('should throw an exception when trying to sell shares from a portfolio that does not exist', async () => {
      const command = CreateInvestmentOrderCommandMother.pendingSell();
  
      portfolioRepository.whenSearchThenReturn(null);

      expect.assertions(2);
      try {
        await createOrderHandler.handle(command);

      } catch (error: any) {
        expect(error).toBeInstanceOf(InvestmentPortfolioNotFoundException);
        expect(error.message).toBe(command.portfolioId);
      }
    });
  
  });
});
