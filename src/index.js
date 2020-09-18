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
  switch (operator) {
  case '+':
    return x + y;
  case '-':
    return x - y;
  case '*':
    return x * y;
  case '/':
    return x / y;
  default:
    return y;
  }
}

function updateValues(values, input, operator) {
  return typeof input === 'number' ? [values[0], values[1] * 10 + input] : [evaluate(values[0], values[1], operator), 0];
}
function updateOperator(operator, input) {
  return String(input).match(/[+\-*/=]/g) ? input : operator;
}

function render(state = { input: 0, values: [0, 0], operator: '=' }) {
  const { input, values, operator } = state;
  function handleClick(button) {
    if (!String(button).match(/[0-9+\-*/=]/g)) return;
    render({
      input: button,
      values: updateValues(values, button, operator),
      operator: updateOperator(operator, button),
    });
  }
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{typeof input === 'number' ? values[1] : values[0]}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => (
          <button type="button" onClick={() => handleClick(n)}>{n}</button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((o) => (
          <button type="button" onClick={() => handleClick(o)}>{o}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
