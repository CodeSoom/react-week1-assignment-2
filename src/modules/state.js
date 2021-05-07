import { operators } from './fixture';

const isOperator = (input) => (operators.includes(input));
const needToUpdateWithCurrentInput = (currentInput) => !isOperator(currentInput);

const needToUpdateWithCalculate = (
  currentInput, previousInput,
) => (isOperator(currentInput) && !isOperator(previousInput));

const canAppendToDisplay = (
  display, previousInput,
) => (display !== '0' && !isOperator(previousInput));

class State {
  constructor({
    holdingValue,
    holdingOperator,
    display,
    previousInput,
  }) {
    this.holdingValue = holdingValue;
    this.holdingOperator = holdingOperator;
    this.display = display;
    this.previousInput = previousInput;
  }

  updateHoldingOperator(currentInput) {
    return (
      (isOperator(currentInput))
        ? new State({ ...this, holdingOperator: currentInput })
        : this
    );
  }

  updatePreviousInput(currentInput) {
    return new State({ ...this, previousInput: currentInput });
  }

  updateHoldingValue(currentInput, calculated) {
    const { previousInput } = this;

    return (
      (isOperator(currentInput) && !isOperator(previousInput))
        ? new State({ ...this, holdingValue: calculated })
        : this
    );
  }

  updateDisplay(currentInput, calculated) {
    const { display, previousInput } = this;

    if (needToUpdateWithCalculate(currentInput, previousInput)) {
      return new State({ ...this, display: calculated });
    }

    if (needToUpdateWithCurrentInput(currentInput)) {
      const newDisplay = (canAppendToDisplay(display, previousInput))
        ? display + currentInput
        : currentInput;

      return new State({ ...this, display: newDisplay });
    }

    return this;
  }
}

export default State;
