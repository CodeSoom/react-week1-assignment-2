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

function evaluate({ x, y, operator }) {
  return {
    '+': x + y,
    '-': x - y,
    '*': x * y,
    '/': x / y,
    '=': y,
  }[operator];
}

function render(state = {
  accumulator: 0, value: 0, operator: '+',
}) {
  const {
    accumulator, value, operator,
  } = state;

  function updateValue(input) {
    return value * 10 + input;
  }

  function handleClickNumber(input) {
    if (!String(input).match(/[0-9]/g)) return;

    render({
      ...state,
      value: updateValue(input),
    });
  }

  function handleClickOperator(input) {
    if (!String(input).match(/[+\-*/=]/g)) return;

    render({
      accumulator: evaluate({ x: accumulator, y: value, operator }),
      value: null,
      operator: input,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{value || accumulator}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((content) => (
          <button type="button" onClick={() => handleClickNumber(content)}>{content}</button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((content) => (
          <button type="button" onClick={() => handleClickOperator(content)}>{content}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
