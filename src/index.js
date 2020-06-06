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

  const onClickNumber = (number) => {
    const concatedNumber = input * 10 + number;
    const value = {
      input: concatedNumber,
      display: concatedNumber,
    };
    render(value, { cumulative, operand, operator });
  };

  const onClickSymbol = (symbol) => {
    const cumulativeValue = arithmetic[operator](cumulative, input);
    const value = {
      input: 0,
      display: cumulativeValue,
    };
    const expression = {
      operand: symbol !== '=' ? input : 0,
      cumulative: symbol !== '=' ? cumulativeValue : 0,
      operator: symbol in arithmetic ? symbol : '+',
    };
    render(value, expression);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{display}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button
            type="button"
            onClick={() => onClickNumber(number)}
          >
            {number}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((symbol) => (
          <button
            type="button"
            onClick={() => onClickSymbol(symbol)}
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
