import { NumberCalculator } from '../../src/NumberCalculator';

describe('NumberCalculator', () => {
  it.each([
    [1, '+', 3, 4, 34],
    [1, '+', undefined, 4, 4],
    [1, undefined, undefined, 4, 14],
    [undefined, undefined, undefined, 1, 1],
  ])('firstNum=%s, operator=%s, secondNum=%s, clickNumber=%s 이면 현재 결과는 %s이다',
    (firstNum, operator, secondNum, clickNumber, expectDisplayNumber) => {
      const result = NumberCalculator.calculate(firstNum, operator, secondNum, clickNumber);

      expect(result.display).toBe(expectDisplayNumber);
    });
});
