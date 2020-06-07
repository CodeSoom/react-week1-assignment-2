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

function render(params) {
  const {
    number, result, rememberValue, rememberExpression, isNumeric,
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button
            type="button"
            onClick={() => {
              render({
                number: Number(`${number}${i}`),
                rememberValue,
                rememberExpression,
                isNumeric: true,
              });
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
              render({
                number: 0,
                result: (rememberValue !== undefined)
                  ? calculation(rememberValue, rememberExpression, number)
                  : number,
                rememberValue: (rememberValue !== undefined)
                  ? calculation(rememberValue, rememberExpression, number)
                  : number,
                rememberExpression: i,
                isNumeric: false,
              });
            }}
          >
            {i}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            if (rememberValue !== undefined) {
              render({
                number: 0,
                result: calculation(rememberValue, rememberExpression, number),
                isNumeric: false,
              });
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

render({
  number: 0,
  isNumeric: true,
});
