import { v4, validate } from 'uuid';

export class IdGenerator {

    static random(): string {
        return v4();
    }

    static isValid(value: string): boolean {
        return validate(value);
    }

}
