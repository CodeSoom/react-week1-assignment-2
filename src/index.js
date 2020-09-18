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
  };

  return map[operator];
}

function render({currentNumber = 0, memory}) {
  const { lastInputType } = memory;

  const updateCurrentNumber = (message, clickedNumber) => {
    const { storedNumber, storedOperator } = memory;

    const map = {
      NEW: clickedNumber,
      ADD: currentNumber * 10 + clickedNumber,
      RESULT: calculate(currentNumber, storedNumber, storedOperator),
      STORE: currentNumber,
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
    };

    return { ...memory, ...map[message] };
  };

  const handleClickNumber = (number) => {
    const message = (lastInputType === 'NUMBER' ? 'ADD' : 'NEW');

    render({
      currentNumber: updateCurrentNumber(message, number, currentNumber, memory),
      memory: updateMemory(message, currentNumber, null, memory),
    });
  };

  const handleClickOperator = (operator) => {
    const message = (operator === '=') ? 'RESULT' : 'STORE';

    render({
      currentNumber: updateCurrentNumber(message, null, currentNumber, memory),
      memory: updateMemory(message, operator, currentNumber, memory),
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
        {['+', '='].map((operator) => (
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
