import { UuidMother } from '../../../../Shared/Domain/ValueObject/UuidMother';
import { InvestmentPortfolioId } from './../../../../../../src/Contexts/Investment/Shared/Domain/ValueObject/InvestmentPortfolioId';

export class InvestmentPortfolioIdMother {
    static create(value: string): InvestmentPortfolioId {
      return new InvestmentPortfolioId(value);
    }
  
    static creator() {
      return () => InvestmentPortfolioIdMother.random();
    }
  
    static random(): InvestmentPortfolioId {
      return this.create(UuidMother.random());
    }
  }
  