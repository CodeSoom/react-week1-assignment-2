/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

// TODO: handler 함수의 분리
// TODO: update 함수의 통합
// TODO: 값을 update 하는 로직을 함수로 분리

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

function render(inputs) {
  const lastInput = _.last(inputs);
  const currentNumber = typeof lastInput === 'number' ? lastInput : inputs[0];

  const updateInputs = (message, input) => {
    const updated = {
      ADD_NUMBER: [..._.dropRight(inputs), currentNumber * 10 + input],
    };

    return updated[message] || [...inputs, input];
  };

  const handleClickInput = (input) => {
    const createMessage = () => {
      if (typeof input === 'number') {
        return (typeof _.last(inputs) === 'number' ? 'ADD_NUMBER' : 'REFRESH_NUMBER');
      }
      return null;
    };

    render(updateInputs(createMessage(), input));
  };

  const createButtons = (inputLabels) => (
    inputLabels.map((input) => (
      <button type="button" onClick={() => handleClickInput(input)}>
        {input}
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
        {createButtons([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])}
      </p>
      <p>
        {createButtons(['+', '-', '*', '/', '='])}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render([0]);
