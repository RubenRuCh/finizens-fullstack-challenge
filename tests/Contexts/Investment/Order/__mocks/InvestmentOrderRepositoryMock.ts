import { InvestmentOrder } from '../../../../../src/Contexts/Investment/Order/Domain/Model/InvestmentOrder';
import { InvestmentOrderRepository } from '../../../../../src/Contexts/Investment/Order/Domain/Model/InvestmentOrderRepository';
import { InvestmentOrderId } from '../../../../../src/Contexts/Investment/Order/Domain/ValueObject/InvestmentOrderId';
import { InvestmentPortfolioId } from '../../../../../src/Contexts/Investment/Shared/Domain/ValueObject/InvestmentPortfolioId';
import { Criteria } from "../../../../../src/Contexts/Shared/Domain/Criteria/Criteria";
import { Nullable } from "../../../../../src/Contexts/Shared/Domain/Nullable";

export class InvestmentOrderRepositoryMock implements InvestmentOrderRepository {
    private mockSave = jest.fn();
    private mockDeleteId = jest.fn();
    private mockSearchId = jest.fn();
    private mockSearchByPortfolioId = jest.fn();
    private mockSearchCriteria = jest.fn();
  
    async save(order: InvestmentOrder): Promise<void> {
      this.mockSave(order);
    }

    assertLastSavedOrderIs(expected: InvestmentOrder): void {
      const mock = this.mockSave.mock;
      const lastSavedPortfolio = mock.calls[mock.calls.length - 1][0] as InvestmentOrder;

      expect(lastSavedPortfolio).toBeInstanceOf(InvestmentOrder);
      expect(lastSavedPortfolio.toDTO()).toEqual(expected.toDTO());
    }
  
    async delete(orderId: InvestmentOrderId): Promise<void> {
      this.mockDeleteId(orderId);
    }
  
    assertLastDeletedOrderIdIs(expected: InvestmentOrderId): void {
      const mock = this.mockDeleteId.mock;
      const lastDeletedOrderId = mock.calls[mock.calls.length - 1][0] as InvestmentOrderId;

      expect(lastDeletedOrderId).toBeInstanceOf(InvestmentOrderId);
      expect(lastDeletedOrderId.value).toEqual(expected.value);
    }
  
    async search(criteria: Criteria): Promise<InvestmentOrder[]> {
      return this.mockSearchCriteria(criteria);
    }

    async getById(id: InvestmentOrderId): Promise<Nullable<InvestmentOrder>> {
      return this.mockSearchId(id);
    }

    whenSearchThenReturn(value: Nullable<InvestmentOrder>): void {
      this.mockSearchId.mockReturnValue(value);
    }

    assertLastSearchedOrderIs(expected: InvestmentOrderId): void {
      expect(this.mockSearchId).toHaveBeenCalledWith(expected);
    }

    async getByPortfolioId(portfolioId: InvestmentPortfolioId): Promise<InvestmentOrder[]> {
      return this.mockSearchByPortfolioId(portfolioId);
    }

    whenSearchByPortfolioIdThenReturn(value: InvestmentOrder[]): void {
      this.mockSearchByPortfolioId.mockReturnValue(value);
    }

    assertLastSearchedPortfolioIdIs(expected: InvestmentPortfolioId): void {
      expect(this.mockSearchByPortfolioId).toHaveBeenCalledWith(expected);
    }
  }
   