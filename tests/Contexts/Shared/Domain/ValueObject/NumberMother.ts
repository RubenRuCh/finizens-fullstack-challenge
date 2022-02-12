import { MotherCreator } from "./MotherCreator";

export class NumberMother {
  static random(max?: number): number {
    return MotherCreator.random().datatype.number(max)
  }
}
