// eslint-disable-next-line import/named
import { Operator } from '../../src/Operator';

describe('Operator', () => {
  describe('calculate', () => {
    it('PLUS 연산자는 2개의 숫자를 합친 결과를 반환한다', () => {
      const sut = Operator.PLUS;

      const result = sut.calculate(1, 2);

      expect(result).toBe(3);
    });

    it('MINUS 연산자는 2개의 숫자를 뺀 결과를 반환한다', () => {
      const sut = Operator.MINUS;

      const result = sut.calculate(2, 1);

      expect(result).toBe(1);
    });

    it('MULTIPLE 연산자는 2개의 숫자를 곱셈한 결과를 반환한다', () => {
      const sut = Operator.MULTIPLY;

      const result = sut.calculate(2, 3);

      expect(result).toBe(6);
    });

    it('DIVIDE 연산자는 2개의 숫자를 나눈 결과를 반환한다', () => {
      const sut = Operator.DIVIDE;

      const result = sut.calculate(6, 2);

      expect(result).toBe(3);
    });

    it('DIVIDE 연산자는 소수점도 반환한다', () => {
      const sut = Operator.DIVIDE;

      const result = sut.calculate(9, 5);

      expect(result).toBe(1.8);
    });
  });

  describe('find', () => {
    it('+ 표기로 PLUS 를 반환한다 ', () => {
      const display = '+';

      const result = Operator.findByDisplay(display);

      expect(result).toBe(Operator.PLUS);
    });
  });
});
