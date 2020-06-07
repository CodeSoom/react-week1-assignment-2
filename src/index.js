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

function clickNumber(reset, it, current) {
  return reset ? it : Number([current === 0 ? '' : current, it].join(''));
}

function clickOperator(i, current, calculation, operator) {
  if (operator !== i && i !== '+' && operator !== '-') {
    return current;
  }
  return calculation;
}

function render(current = 0, reset = false, operator = '=', calculation = '') {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{current}</p>
      <p>
        {[...Array(10).keys()].map((it) => (
          <button
            type="button"
            onClick={() => render(
              clickNumber(reset, it, current),
              false,
              operator,
              calculate(operator, calculation, it),
            )}
          >
            {it}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button
            type="button"
            onClick={() => { render(i === '=' ? calculation : clickOperator(i, current, calculation, operator), true, i === '=' ? '=' : i, i === '=' ? 0 : calculation); }}
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
