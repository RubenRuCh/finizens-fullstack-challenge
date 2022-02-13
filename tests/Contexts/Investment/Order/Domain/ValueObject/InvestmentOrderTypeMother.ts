import { InvestmentOrderType, InvestmentOrderTypeValue } from '../../../../../../src/Contexts/Investment/Order/Domain/ValueObject/InvestmentOrderType';

export class InvestmentOrderTypeMother {
  static create(value: InvestmentOrderTypeValue): InvestmentOrderType {
    return new InvestmentOrderType(value);
  }

  static creator() {
    return () => InvestmentOrderTypeMother.random();
  }

  static random(): InvestmentOrderType {
    if (Math.random() >= 0.5) {
      return this.sell();
    }

    return this.buy();
  }

  static sell(): InvestmentOrderType {
    return this.create('sell');
  }

  static buy(): InvestmentOrderType {
    return this.create('buy');
  }
}
  