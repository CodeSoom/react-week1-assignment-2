import { isNumeric } from '../isNumeric';
import { Operator } from '../Operator';

/**
 *
 * @param firstNumber: {number}
 * @param operator: {string}
 * @param secondNumber: {number}
 * @param clickOperator: {string}
 * @param render: {Function}
 */
// eslint-disable-next-line import/prefer-default-export
export function handleClickOperator(firstNumber, operator, secondNumber, clickOperator, render) {
  const isFullExpression = isNumeric(firstNumber) && operator && isNumeric(secondNumber);
  if (isFullExpression) {
    const result = Operator.calculateBy(operator, firstNumber, secondNumber);
    render(result, clickOperator, undefined, result);
    return;
  }

  render(firstNumber, clickOperator, undefined, firstNumber);
}
