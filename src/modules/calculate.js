import * as R from 'ramda';

const toNumber = (string) => Number(string);
const setCalculator = (operator) => {
  const operationSet = {
    '+': R.add,
    '-': R.subtract,
    '*': R.multiply,
    '/': R.divide,
    '=': R.nthArg(-1),
  };
  return operationSet[operator];
};

const calculate = (left, operator, right) => (
  R.pipe(
    R.useWith(setCalculator(operator), [toNumber, toNumber]),
    R.toString,
  )(left, right)
);

export default calculate;
