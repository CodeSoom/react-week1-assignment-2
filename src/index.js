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

function render(params) {
  function displayNumber(prev, number) {
    return prev * 10 + number;
  }

  function updateNumberDisplay(number) {
    render({
      ...params,
      number: displayNumber(params.number, number),
      isNumeric: true,
    });
  }

  function calculation(operation, rememberValue, newValue) {
    if (rememberValue === null) {
      return newValue;
    }

    const operations = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
      '=': (a, b) => b,
    };

    return operations[operation](rememberValue, newValue);
  }

  function updateOperationDisplay(operation) {
    const {
      number, rememberValue, rememberOperation,
    } = params;

    const result = calculation(rememberOperation, rememberValue, number);

    render({
      ...params,
      number: 0,
      result,
      rememberValue: operation === '=' ? null : result,
      rememberOperation: operation,
      isNumeric: false,
    });
  }

  const {
    number, result, isNumeric,
  } = params;

  const element = (
    <div>
      <p>
        간단 계산기
      </p>
      <p>
        {isNumeric ? number : result}
      </p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button
            type="button"
            onClick={() => {
              updateNumberDisplay(num);
            }}
          >
            {num}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((operation) => (
          <button
            type="button"
            onClick={() => {
              updateOperationDisplay(operation);
            }}
          >
            {operation}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  number: 0,
  result: null,
  rememberValue: null,
  rememberOperation: null,
  isNumeric: true,
});
