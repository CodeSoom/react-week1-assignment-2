/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */
import _ from 'lodash';

const operatorButtons = ['+', '-', '*', '/', '='];
const numberButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const initialState = {
  holdingValue: '0',
  holdingOperator: '=',
  display: '0',
  previousInput: '0',
};

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

const getNewState = (e, oldState) => {
  const {
    holdingValue,
    holdingOperator,
    display,
    previousInput,
  } = oldState;
  const currentInput = e.target.textContent;

  if (isOperator(currentInput) && !isOperator(previousInput)) {
    const calculated = calculate(holdingValue, holdingOperator, display);
    return ({
      holdingValue: calculated,
      holdingOperator: currentInput,
      display: calculated,
      previousInput: currentInput,
    });
  }

  if (isOperator(currentInput) && isOperator(previousInput)) {
    return ({
      ...oldState,
      holdingOperator: currentInput,
      previousInput: currentInput,
    });
  }

  if (!isOperator(currentInput) && (display !== '0' && !isOperator(previousInput))) {
    return ({
      ...oldState,
      display: display + currentInput,
      previousInput: currentInput,
    });
  }

  if (!isOperator(currentInput) && !(display !== '0' && !isOperator(previousInput))) {
    return ({
      ...oldState,
      display: currentInput,
      previousInput: currentInput,
    });
  }

  return null;
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
