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

function render(info = {
  left: 0,
  operator: '+',
  rigth: 0,
  nextOperator: '+',
}) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];

  function calculate(x, operator, y, nextOperator) {
    const cases = {
      '+': x + y,
      '-': x - y,
      '*': x * y,
      '/': x / y,
      '=': y,
    };
    render({
      left: cases[operator],
      operator: nextOperator,
      rigth: 0,
      nextOperator: '+',
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{info.rigth ? info.rigth : info.left}</p>
      <p>
        {numbers.map((number) => (
          <button
            type="button"
            onClick={() => {
              render({
                left: info.left,
                operator: info.operator,
                rigth: info.rigth * 10 + number,
                nextOperator: info.nextOperator,
              });
            }}
          >
            {number}
          </button>
        ))}
      </p>
      <p>
        {operators.map((operator) => (
          <button
            type="button"
            onClick={() => {
              calculate(
                info.left,
                info.operator,
                info.rigth ? info.rigth : info.left,
                operator,
              );
            }}
          >
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
