import { ValueObject } from "./ValueObject";

export abstract class NumberValueObject extends ValueObject<number> {
    constructor(value: number) {
      super(value);
    }
  
    isBiggerThan(other: NumberValueObject): boolean {
      return  super.value > other.value;
    }

    isSmallerThan(other: NumberValueObject): boolean {
      return  super.value < other.value;
    }
}
  