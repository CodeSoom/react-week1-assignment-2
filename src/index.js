/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */

const operatorButtons = ['+', '-', '*', '/', '='];
const numberButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const initialState = {
  holdingValue: '0',
  holdingOperator: '=',
  display: '0',
  previous: '0',
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
const toNumber = (_) => Number(_);
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
const render = (currentState) => {
  const reRender = (e, state) => {
    const {
      holdingValue,
      holdingOperator,
      display,
      previous,
    } = state;
    const current = e.target.textContent;

    if (isOperator(current)) {
      if (!isOperator(previous)) {
        const calculated = calculate(holdingValue, holdingOperator, display);
        render({
          holdingValue: calculated,
          holdingOperator: current,
          display: calculated,
          previous: current,
        });
      } else {
        render({
          ...state,
          holdingOperator: current,
          previous: current,
        });
      }
    } else if (display !== '0' && !isOperator(previous)) {
      render({
        ...state,
        display: display + current,
        previous: current,
      });
    } else {
      render({
        ...state,
        display: current,
        previous: current,
      });
    }
  };

  const element = (
    <div id="simpleCalculator">
      <h1>간단 계산기</h1>
      <h2>{currentState.display}</h2>
      <p>
        {numberButtons.map((number) => (
          <button
            type="button"
            onClick={(e) => reRender(e, currentState)}
          >
            {number}
          </button>
        ))}
      </p>

      <p>
        {operatorButtons.map((operator) => (
          <button
            type="button"
            onClick={(e) => reRender(e, currentState)}
          >
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  const container = document.getElementById('app');
  container.textContent = '';
  container.appendChild(element);
};

render(initialState);
