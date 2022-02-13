import { InvestmentOrderStatus, InvestmentOrderStatusValue } from '../../../../../../src/Contexts/Investment/Order/Domain/ValueObject/InvestmentOrderStatus';

export class InvestmentOrderStatusMother {
  static create(value: InvestmentOrderStatusValue): InvestmentOrderStatus {
    return new InvestmentOrderStatus(value);
  }

  static creator() {
    return () => InvestmentOrderStatusMother.random();
  }

  static random(): InvestmentOrderStatus {
    if (Math.random() >= 0.5) {
      return this.pending();
    }

    return this.completed();
  }

  static pending(): InvestmentOrderStatus {
    return this.create('pending');
  }

  static completed(): InvestmentOrderStatus {
    return this.create('completed');
  }
}
  