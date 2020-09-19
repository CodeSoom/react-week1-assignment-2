/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

import _ from 'lodash';

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

function calculate(firstNumber, secondNumber, operator) {
  const result = {
    '+': firstNumber + secondNumber,
    '-': firstNumber - secondNumber,
    '*': firstNumber * secondNumber,
    '/': firstNumber / secondNumber,
  };

  return result[operator];
}

function render({ inputs }) {
  const [secondLastInput, lastInput] = _.takeRight(inputs, 2);
  const isLastInputNumber = typeof lastInput === 'number';
  const currentNumber = isLastInputNumber ? lastInput : secondLastInput;

  const handleClickNumber = (number) => {
    const message = isLastInputNumber ? 'UPDATE_NUMBER' : 'STORE_NUMBER';

    const updateInputs = () => {
      const updated = {
        STORE_NUMBER: { inputs: [...inputs, number] },
        UPDATE_NUMBER: { inputs: [..._.dropRight(inputs), currentNumber * 10 + number] },
      };

      return updated[message];
    };

    render(updateInputs());
  };

  const handleClickOperator = (operator) => {
    const storedNumber = inputs[inputs.length - 3];
    const lastOperator = inputs[inputs.length - 2] || '=';
    const message = lastOperator === '=' ? 'STORE_OPERATOR' : 'CALCULATE';

    const updateInputs = () => {
      const updated = {
        STORE_OPERATOR: { inputs: [...inputs, operator] },
        CALCULATE: { inputs: [calculate(storedNumber, currentNumber, lastOperator), operator] },
      };

      return updated[message];
    };

    render(updateInputs());
  };

  const createButtons = (values, handleClick) => (
    values.map((value) => (
      <button type="button" onClick={() => handleClick(value)}>
        {value}
      </button>
    ))
  );

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {currentNumber}
      </p>
      <p>
        {createButtons([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], handleClickNumber)}
      </p>
      <p>
        {createButtons(['+', '-', '*', '/', '='], handleClickOperator)}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ inputs: [0] });
