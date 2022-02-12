import { ValueObject } from "../../../../Shared/Domain/ValueObject/ValueObject";

export type InvestmentOrderTypeValue = 'buy' | 'sell';

export class InvestmentOrderType extends ValueObject<InvestmentOrderTypeValue> {
    constructor(value: InvestmentOrderTypeValue){
        super(value);
    }

    public get isBuy(): boolean {
        return this.value === 'buy';
    }

    public get isSell(): boolean {
        return this.value === 'sell';
    }
}
