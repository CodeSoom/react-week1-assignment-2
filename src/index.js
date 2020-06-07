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
  function calculation(operation, rememberValue, value) {
    if (rememberValue === null) {
      return value;
    }

    const operations = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
      '=': (a, b) => b,
    };

    return operations[operation](rememberValue, value);
  }

  function updateNumberDisplay(prev, number) {
    render({
      ...prev,
      number: Number(`${prev.number}${number}`),
      isNumeric: true,
    });
  }

  function updateOperationDisplay(prev, operation) {
    const {
      number, rememberValue, rememberOperation,
    } = prev;

    const resultValue = calculation(rememberOperation, rememberValue, number);

    render({
      ...prev,
      number: 0,
      result: resultValue,
      rememberValue: operation === '=' ? null : resultValue,
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
              updateNumberDisplay(params, num);
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
              updateOperationDisplay(params, operation);
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
