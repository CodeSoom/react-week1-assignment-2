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

const operate = {
  '': (x, y) => x || y,
  '=': (x, y) => x || y,
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

const initialState = {
  num1: 0,
  num2: 0,
  operator: '',
};

function calculate(num1, num2, operator) {
  return operate[operator](num2, num1);
}

function render({ num1, num2, operator }) {
  function handleClickNumber({ number }) {
    render({
      num1: num1 * 10 + number,
      num2,
      operator,
    });
  }

  function handleClickOperator({ op }) {
    render({
      num1: 0,
      num2: calculate(num1, num2, operator),
      operator: op,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{num1 || num2}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
          <button
            type="button"
            onClick={() => handleClickNumber({ number: digit })}
          >
            {digit}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((string) => (
          <button
            type="button"
            onClick={() => handleClickOperator({ op: string })}
          >
            {string}
          </button>
        ))}
      </p>
    </div>
  );

  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(element);
}

render(initialState);
