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

const app = document.getElementById('app');

const [zero, ...rest] = [...Array(10).keys()];
const numbers = [...rest, zero];

const signs = ['+', '-', '*', '/', '='];

const defaultValue = {
  prevInput: null,
  savedOperator: null,
  savedValue: null,
  currentValue: 0,
};

function compute(prevValue, newValue) {
  return {
    '+': prevValue + newValue,
    '-': prevValue - newValue,
    '*': prevValue * newValue,
    '/': prevValue / newValue,
  };
}

function areNumbers(input1, input2) {
  return typeof (input1) === 'number' && typeof (input2) === 'number';
}

function render({
  prevInput, savedOperator, savedValue, currentValue,
}) {
  function handleNumber(input) {
    if (areNumbers(prevInput, input)) {
      const value = currentValue * 10 + input;

      render({
        prevInput: input,
        savedOperator,
        savedValue,
        currentValue: value,
      });
      return;
    }
    render({
      prevInput: input,
      savedOperator,
      savedValue: currentValue,
      currentValue: input,
    });
  }

  function handleEquality(input) {
    const value = compute(savedValue, currentValue)[savedOperator];

    render({
      prevInput: input,
      savedOperator: null,
      savedValue: null,
      currentValue: value,
    });
  }

  function haveSavedOperator() {
    return !!savedOperator;
  }

  function handleOperator(input) {
    if (haveSavedOperator()) {
      const value = compute(savedValue, currentValue)[savedOperator];

      render({
        prevInput: input,
        savedOperator: input,
        savedValue: null,
        currentValue: value,
      });
      return;
    }
    render({
      prevInput: input,
      savedOperator: input,
      savedValue,
      currentValue,
    });
  }

  function handleSign(input) {
    if (input === '=') {
      handleEquality(input);
      return;
    }
    handleOperator(input);
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{currentValue}</p>
      <p>
        {numbers.map((i) => (
          <button type="button" onClick={() => handleNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {signs.map((sign) => (
          <button type="button" onClick={() => handleSign(sign)}>
            {sign}
          </button>
        ))}
      </p>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render(defaultValue);
