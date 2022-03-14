import { NumberCalculator } from '../NumberCalculator';

/**
 *
 * @param firstNumber: {number}
 * @param operator: {string}
 * @param secondNumber: {number}
 * @param clickNumber: {number}
 * @param render: {Function}
 */
// eslint-disable-next-line import/prefer-default-export
export function handleClickNumber(firstNumber, operator, secondNumber, clickNumber, render) {
  const result = NumberCalculator.calculate(firstNumber, operator, secondNumber, clickNumber);
  render(result.before, result.op, result.current, result.display);
}
