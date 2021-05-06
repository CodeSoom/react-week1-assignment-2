/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */
import _ from 'lodash';

const operatorButtons = ['+', '-', '*', '/', '='];
const numberButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const createElement = (tagname, props, ...children) => {
  const element = document.createElement(tagname);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    const nodeToAppend = (child instanceof Node)
      ? child
      : document.createTextNode(child);

    element.appendChild(nodeToAppend);
  });

  return element;
};
const toNumber = (string) => Number(string);
const isOperator = (input) => (operatorButtons.includes(input));
const canAppendToDisplay = (display, previousInput) => (display !== '0' && !isOperator(previousInput));
const needToUpdateWithCalculate = (currentInput, previousInput) => (isOperator(currentInput)
&& !isOperator(previousInput));
const needToUpdateWithCurrentInput = (currentInput) => !isOperator(currentInput);
const plus = (left, right) => left + right;
const minus = (left, right) => left - right;
const multiplication = (left, right) => left * right;
const division = (left, right) => left / right;
const equal = (left, right) => right;
const calculate = (left, operator, right) => {
  const [leftInNumber, rightInNumber] = [left, right].map(toNumber);
  const operationSet = {
    '+': plus,
    '-': minus,
    '*': multiplication,
    '/': division,
    '=': equal,
  };

  return operationSet[operator](leftInNumber, rightInNumber).toString();
};

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
const initialState = new State(
  {
    holdingValue: '0',
    holdingOperator: '=',
    display: '0',
    previousInput: '0',
  },
);

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

const render = (currentState) => {
  const element = (
    <div id="simpleCalculator">
      <h1>간단 계산기</h1>
      <h2>{currentState.display}</h2>

      { _.concat(numberButtons, '\n', operatorButtons)
        .map((buttonName) => (
          (buttonName === '\n')
            ? <br />
            : (
              <button
                type="button"
                onClick={(e) => render(getNewState(e, currentState))}
              >
                {buttonName}
              </button>
            )
        ))}

    </div>
  );

  const container = document.getElementById('app');
  container.textContent = '';
  container.appendChild(element);
};

render(initialState);
