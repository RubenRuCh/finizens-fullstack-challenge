import { InvestmentOrderId } from '../../../../../../src/Contexts/Investment/Order/Domain/ValueObject/InvestmentOrderId';
import { UuidMother } from '../../../../Shared/Domain/ValueObject/UuidMother';

export class InvestmentOrderIdMother {
  static create(value: string): InvestmentOrderId {
    return new InvestmentOrderId(value);
  }

  static creator() {
    return () => InvestmentOrderIdMother.random();
  }

  static random(): InvestmentOrderId {
    return this.create(UuidMother.random());
  }
}
  