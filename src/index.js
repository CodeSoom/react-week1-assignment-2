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

function render(savedOperator, prevInput, savedValue, currentValue) {
  function compute(prevValue, newValue) {
    return {
      '+': prevValue + newValue,
      '-': prevValue - newValue,
      '*': prevValue * newValue,
      '/': prevValue / newValue,
    };
  }

  function numberAfterNumber(input1, input2) {
    return typeof (input1) === 'number' && typeof (input2) === 'number';
  }

  function handleClick(input) {
    if (numberAfterNumber(prevInput, input)) {
      const value = currentValue * 10 + input;

      render(savedOperator, input, savedValue, value);
      return;
    }

    if (typeof (input) === 'number') {
      render(savedOperator, input, savedValue, input);
      return;
    }

    if (input === '=') {
      const value = compute(savedValue, currentValue)[savedOperator];

      render(null, input, 0, value);
      return;
    }

    if (!savedOperator) {
      render(input, input, currentValue, currentValue);
      return;
    }

    if (savedOperator) {
      const value = compute(savedValue, currentValue)[savedOperator];

      render(input, input, value, value);
    }
  }

  const [zero, ...rest] = [...Array(10).keys()];

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{currentValue}</p>
      <p>
        {[...rest, zero].map((i) => (
          <button type="button" onClick={() => handleClick(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((operator) => (
          <button type="button" onClick={() => handleClick(operator)}>
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(null, 0, 0, 0);
