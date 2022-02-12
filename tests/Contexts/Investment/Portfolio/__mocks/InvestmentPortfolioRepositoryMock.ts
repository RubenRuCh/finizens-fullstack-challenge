import { InvestmentAllocation } from "../../../../../src/Contexts/Investment/Portfolio/Domain/Model/Allocation/InvestmentAllocation";
import { InvestmentPortfolioRepository } from "../../../../../src/Contexts/Investment/Portfolio/Domain/Model/InvestmentPortfolioRepository";
import { InvestmentPortfolio } from "../../../../../src/Contexts/Investment/Portfolio/Domain/Model/Portfolio/InvestmentPortfolio";
import { InvestmentAllocationId } from "../../../../../src/Contexts/Investment/Shared/Domain/ValueObject/InvestmentAllocationId";
import { InvestmentPortfolioId } from "../../../../../src/Contexts/Investment/Shared/Domain/ValueObject/InvestmentPortfolioId";
import { Criteria } from "../../../../../src/Contexts/Shared/Domain/Criteria/Criteria";
import { Nullable } from "../../../../../src/Contexts/Shared/Domain/Nullable";

export class InvestmentPortfolioRepositoryMock implements InvestmentPortfolioRepository {
    private mockSave = jest.fn();
    private mockSearchId = jest.fn();
    private mockSearchAllocationId = jest.fn();
    private mockSearchCriteria = jest.fn();
  
    async save(portfolio: InvestmentPortfolio): Promise<void> {
      this.mockSave(portfolio);
    }
  
    assertLastSavedPortfolioIs(expected: InvestmentPortfolio): void {
      const mock = this.mockSave.mock;
      const lastSavedPortfolio = mock.calls[mock.calls.length - 1][0] as InvestmentPortfolio;

      expect(lastSavedPortfolio).toBeInstanceOf(InvestmentPortfolio);
      expect(lastSavedPortfolio.toDTO()).toEqual(expected.toDTO());
    }
  
    async search(criteria: Criteria): Promise<InvestmentPortfolio[]> {
      return this.mockSearchCriteria(criteria);
    }

    async getById(id: InvestmentPortfolioId): Promise<Nullable<InvestmentPortfolio>> {
        return this.mockSearchId(id);
    }

    async getAllocationById(id: InvestmentAllocationId): Promise<Nullable<InvestmentAllocation>> {
        return this.mockSearchAllocationId(id);
    }
  
    whenSearchThenReturn(value: Nullable<InvestmentPortfolio>): void {
      this.mockSearchId.mockReturnValue(value);
    }

    whenSearchAllocationThenReturn(value: Nullable<InvestmentAllocation>): void {
        this.mockSearchAllocationId.mockReturnValue(value);
    }
  
    assertLastSearchedPortfolioIs(expected: InvestmentPortfolioId): void {
      expect(this.mockSearchId).toHaveBeenCalledWith(expected);
    }

    assertLastSearchedAllocationIs(expected: InvestmentAllocationId): void {
        expect(this.mockSearchAllocationId).toHaveBeenCalledWith(expected);
    }
  }
   