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

function calculation(first, expression, second) {
  const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '=': (a, b) => a,
  };

  return operations[expression](first, second);
}

function render(input = 0, result, rememberValue, rememberExpression, isNumeric = true) {
  const element = (
    <div>
      <p>
        간단 계산기
      </p>
      <p>
        {isNumeric ? input : result}
      </p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button
            type="button"
            onClick={() => {
              const value = `${input}${i}`;
              render(Number(value), 0, rememberValue, rememberExpression, true);
            }}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/'].map((i) => (
          <button
            type="button"
            onClick={() => {
              if (rememberValue !== undefined) {
                const newValue = calculation(rememberValue, rememberExpression, input);
                render(0, newValue, newValue, i, false);
                return;
              }
              render(0, input, input, i, false);
            }}
          >
            {i}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            if (rememberValue !== undefined) {
              const newValue = calculation(rememberValue, rememberExpression, input);
              render(0, newValue, undefined, undefined, false);
            }
          }}
        >
          =
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
