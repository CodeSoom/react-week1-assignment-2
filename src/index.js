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
  const result = {
    '+': firstNumber + secondNumber,
    '-': firstNumber - secondNumber,
    '*': firstNumber * secondNumber,
    '/': firstNumber / secondNumber,
  };

  return result[operator];
}

function render({ currentNumber, memory }) {
  const { lastInputType, storedNumber, storedOperator } = memory;

  const updateCurrentNumber = (message, input) => {
    const updated = {
      REFRESH_NUMBER: input,
      ADD_NUMBER: currentNumber * 10 + input,
      STORE_OPERATOR: currentNumber,
      SHOW_RESULT: calculate(storedNumber, currentNumber, storedOperator),
      CONTINUOUS_OPERATION: calculate(storedNumber, currentNumber, storedOperator),
    };

    return updated[message];
  };

  const updateMemory = (message, input) => {
    const updated = {
      REFRESH_NUMBER: { lastInputType: 'NUMBER' },
      ADD_NUMBER: { lastInputType: 'NUMBER' },
      STORE_OPERATOR: {
        storedNumber: currentNumber,
        storedOperator: input,
        lastInputType: 'OPERATOR',
      },
      SHOW_RESULT: {
        storedNumber: null,
        storedOperator: null,
        lastInputType: 'OPERATOR',
      },
      CONTINUOUS_OPERATION: {
        storedNumber: calculate(storedNumber, currentNumber, storedOperator),
        storedOperator: input,
        lastInputType: 'OPERATOR',
      },
    };

    return { ...memory, ...updated[message] };
  };

  const handleClickInput = (input) => {
    const createMessage = () => {
      if (Number.isInteger(input)) {
        return (lastInputType === 'NUMBER') ? 'ADD_NUMBER' : 'REFRESH_NUMBER';
      }
      if (storedOperator) {
        return 'CONTINUOUS_OPERATION';
      }
      if (input === '=') {
        return 'SHOW_RESULT';
      }
      return 'STORE_OPERATOR';
    };

    render({
      currentNumber: updateCurrentNumber(createMessage(), input),
      memory: updateMemory(createMessage(), input),
    });
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

render({ currentNumber: 0, memory: {} });
