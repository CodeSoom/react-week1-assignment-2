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

function calculation(operation, rememberValue, newValue) {
  if (rememberValue === undefined) {
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

function updateNumberDisplay(params, number) {
  return {
    ...params,
    number: Number(`${params.number}${number}`),
    isNumeric: true,
  };
}

function updateOperationDisplay(params, operation) {
  const {
    number, rememberValue, rememberOperation,
  } = params;

  const resultValue = calculation(rememberOperation, rememberValue, number);

  return {
    ...params,
    number: 0,
    result: resultValue,
    rememberValue: operation === '=' ? undefined : resultValue,
    rememberOperation: operation,
    isNumeric: false,
  };
}

function render(params) {
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
              render(updateNumberDisplay(params, num));
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
              render(updateOperationDisplay(params, operation));
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
  isNumeric: true,
});
