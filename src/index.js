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

function evaluate(x, y, operator) {
  return {
    '+': x + y,
    '-': x - y,
    '*': x * y,
    '/': x / y,
    '=': x,
  }[operator];
}

function render(state = { values: [0, 0], operator: '+', display: 0 }) {
  const { values, operator, display } = state;
  function handleClickNumber(input) {
    if (!String(input).match(/[0-9]/g)) return;
    const value = values[1] * 10 + input;
    render({
      values: [values[0], value],
      operator,
      display: value,
    });
  }
  function handleClickOperator(input) {
    if (!String(input).match(/[+\-*/=]/g)) return;
    const evaluation = operator === '=' ? display : evaluate(values[0], values[1], operator);
    render({
      values: [evaluation, 0],
      operator: input,
      display: evaluation,
    });
  }
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{display}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => (
          <button type="button" onClick={() => handleClickNumber(n)}>{n}</button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((o) => (
          <button type="button" onClick={() => handleClickOperator(o)}>{o}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
