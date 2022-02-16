import { ValueObject } from '../../../../Shared/Domain/ValueObject/ValueObject';

export type InvestmentOrderTypeValue = 'buy' | 'sell';

export class InvestmentOrderType extends ValueObject<InvestmentOrderTypeValue> {
    constructor(value: InvestmentOrderTypeValue) {
        super(value);
    }

    public get isBuy(): boolean {
        return this.value === 'buy';
    }

    public get isSell(): boolean {
        return this.value === 'sell';
    }

    public static newBuy(): InvestmentOrderType {
        return new InvestmentOrderType('buy');
    }

    public static newSell(): InvestmentOrderType {
        return new InvestmentOrderType('sell');
    }
}
