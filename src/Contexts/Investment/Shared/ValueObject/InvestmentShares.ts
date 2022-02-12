import { NumberValueObject } from "../../../Shared/Domain/ValueObject/IntValueObject";

export class InvestmentShares extends NumberValueObject {
    constructor(value: number) {
        super(value);
    }
}