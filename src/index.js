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


function calculate(operator, calculation, current) {
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };
  return operator === '=' ? current : operators[operator](calculation, current);
}

function render(current = 0, reset = false, operator = '=', calculation = '') {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{current}</p>
      <p>
        {Array(10).fill(0).map((i, index) => (
          <button
            type="button"
            onClick={() => render(
              reset ? index : Number([current === 0 ? '' : current, index].join('')),
              false,
              operator,
              calculate(operator, calculation, index),
            )}
          >
            {index}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button
            type="button"
            onClick={() => {
              if (i === '=') {
                render(calculation, true, '=', 0);
              } else if (operator !== i) {
                render((i === '+' && operator === '-') ? calculation : current, true, i, calculation);
              } else {
                render(calculation, true, i, calculation);
              }
            }}
          >
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
