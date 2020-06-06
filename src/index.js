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

function render({ input, display }, { cumulative, operand, operator }) {
  const arithmetic = {
    '+': (operand1, operand2) => operand1 + operand2,
    '-': (operand1, operand2) => operand1 - operand2,
    '*': (operand1, operand2) => operand1 * operand2,
    '/': (operand1, operand2) => operand1 / operand2,
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{display}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button
            type="button"
            onClick={() => {
              const concatedNumber = input * 10 + number;
              const value = {
                input: concatedNumber,
                display: concatedNumber,
              };
              render(value, { cumulative, operand, operator });
            }}
          >
            {number}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((symbol) => (
          <button
            type="button"
            onClick={() => {
              const expression = {
                operand: input,
                cumulative: arithmetic[operator](cumulative, input),
                operator: symbol in arithmetic ? symbol : '+',
              };
              const value = {
                input: 0,
                display: expression.cumulative,
              };
              if (symbol === '=') {
                expression.cumulative = 0;
                expression.operand = 0;
              }
              render(value, expression);
            }}
          >
            {symbol}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  input: 0,
  display: 0,
}, {
  cumulative: 0,
  operand: 0,
  operator: '+',
});
