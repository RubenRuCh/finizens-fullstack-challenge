import { ValueObject } from '../../../../Shared/Domain/ValueObject/ValueObject';

export type InvestmentOrderStatusValue = 'pending' | 'completed';

export class InvestmentOrderStatus extends ValueObject<InvestmentOrderStatusValue> {
    constructor(value: InvestmentOrderStatusValue) {
        super(value);
    }

    public get isPending(): boolean {
        return this.value === 'pending';
    }

    public get isCompleted(): boolean {
        return this.value === 'completed';
    }

    public static completed(): InvestmentOrderStatus {
        return new InvestmentOrderStatus('completed');
    }

    public static pending(): InvestmentOrderStatus {
        return new InvestmentOrderStatus('pending');
    }
}
