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

function render(value, expression) {
  const arithmetic = {
    '+': (operand1, operand2) => operand1 + operand2,
    '-': (operand1, operand2) => operand1 - operand2,
    '*': (operand1, operand2) => operand1 * operand2,
    '/': (operand1, operand2) => operand1 / operand2,
  };

  const onClickNumber = ({ input }, exp, number) => {
    const concatedNumber = input * 10 + number;
    render({
      input: concatedNumber,
      display: concatedNumber,
    }, exp);
  };

  const onClickSymbol = ({ input }, { operator, accumulator }, symbol) => {
    const acc = arithmetic[operator](accumulator, input);
    render({
      input: 0,
      display: acc,
    }, {
      accumulator: symbol === '=' ? 0 : acc,
      operand: symbol === '=' ? 0 : input,
      operator: symbol in arithmetic ? symbol : '+',
    });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{value.display}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button
            type="button"
            onClick={() => onClickNumber(value, expression, number)}
          >
            {number}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((symbol) => (
          <button
            type="button"
            onClick={() => onClickSymbol(value, expression, symbol)}
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
  accumulator: 0,
  operand: 0,
  operator: '+',
});
