/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

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
  const map = {
    '+': firstNumber + secondNumber,
    '-': firstNumber - secondNumber,
    '*': firstNumber * secondNumber,
    '/': firstNumber / secondNumber,
  };

  return map[operator];
}

function render({ currentNumber = 0, memory }) {
  const { lastInputType, storedNumber, storedOperator } = memory;

  const updateCurrentNumber = (message, clickedNumber) => {
    const map = {
      NEW: clickedNumber,
      ADD: currentNumber * 10 + clickedNumber,
      RESULT: calculate(storedNumber, currentNumber, storedOperator),
      STORE: currentNumber,
      STORE_AND_RESULT: calculate(storedNumber, currentNumber, storedOperator),
    };

    return map[message];
  };

  const updateMemory = (message, clickedOperator) => {
    const map = {
      NEW: { lastInputType: 'NUMBER' },
      ADD: { lastInputType: 'NUMBER' },
      RESULT: {
        storedNumber: null,
        storedOperator: null,
        lastInputType: 'OPERATOR',
      },
      STORE: {
        storedNumber: currentNumber,
        storedOperator: clickedOperator,
        lastInputType: 'OPERATOR',
      },
      STORE_AND_RESULT: {
        storedNumber: calculate(storedNumber, currentNumber, storedOperator),
        storedOperator: clickedOperator,
        lastInputType: 'OPERATOR',
      },
    };

    return { ...memory, ...map[message] };
  };

  const handleClickNumber = (number) => {
    const message = (lastInputType === 'NUMBER' ? 'ADD' : 'NEW');

    render({
      currentNumber: updateCurrentNumber(message, number),
      memory: updateMemory(message, currentNumber),
    });
  };

  const handleClickOperator = (operator) => {
    const createMessage = () => {
      if (storedOperator) {
        return 'STORE_AND_RESULT';
      }
      if (operator === '=') {
        return 'RESULT';
      }
      return 'STORE';
    };

    render({
      currentNumber: updateCurrentNumber(createMessage()),
      memory: updateMemory(createMessage(), operator),
    });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {currentNumber}
      </p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((operator) => (
          <button type="button" onClick={() => handleClickOperator(operator)}>
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ currentNumber: 0, memory: {} });
