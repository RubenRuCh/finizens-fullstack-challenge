import { NumberValueObject } from "../../../../Shared/Domain/ValueObject/IntValueObject";
import { InvalidSharesException } from "../Exception/InvalidSharesException";

export class InvestmentShares extends NumberValueObject {
    constructor(value: number) {
        if(value < 0) {
            throw new InvalidSharesException('Shares cannot have a negative value');
        }

        super(value);
    }

    public get areEmpty(): boolean {
        return this.value === 0;
    }
}