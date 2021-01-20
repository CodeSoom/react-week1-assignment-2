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

const calculator = {
  process: [],
  resetNumber: true,
};

function render(count = 0) {
  function hardrender(number) {
    calculator.resetNumber = true;
    render(number);
  }
  function calculate(operator, number) {
    calculator.process.push(number);
    calculator.process.push(operator);
    calculator.resetNumber = false;
    if (calculator.process.length === 4) {
      const cases = {
        '+': calculator.process[0] + calculator.process[2],
        '-': calculator.process[0] - calculator.process[2],
        '*': calculator.process[0] * calculator.process[2],
        '/': calculator.process[0] / calculator.process[2],
        '=': calculator.process[2],
      };
      calculator.process = [cases[calculator.process[1]], calculator.process[3]];
      render(calculator.process[0]);
    }
  }
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{count}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button
            type="button"
            onClick={() => {
              if (calculator.resetNumber === false) return hardrender(number);
              return render(count * 10 + number);
            }}
          >
            {number}
          </button>
        ))}
      </p>
      <p>{['+', '-', '*', '/', '='].map((operator) => <button type="button" onClick={() => calculate(operator, count)}>{operator}</button>)}</p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
