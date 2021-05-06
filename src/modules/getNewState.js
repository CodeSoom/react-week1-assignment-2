import calculate from './calculate';

const getNewState = (e, oldState) => {
  const { holdingValue, holdingOperator, display } = oldState;
  const currentInput = e.target.textContent;
  const calculated = calculate(holdingValue, holdingOperator, display);

  const newState = oldState
    .updateHoldingValue(currentInput, calculated)
    .updateHoldingOperator(currentInput)
    .updateDisplay(currentInput, calculated)
    .updatePreviousInput(currentInput);

  return newState;
};

export default getNewState;
