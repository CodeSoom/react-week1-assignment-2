/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const app = document.getElementById('app');
const operators = ['+', '-', '*', '/', '='];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const calculate = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
  '': (x, y) => x,
};

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

function render({ number }) {
  function handleClick(value) {
    render({
      number: number * 10 + value,
    });
  }
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        현재 클릭된 숫자:
        {number}

      </p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item) => (
          <button type="button" onClick={() => handleClick(item)}>
            {item}
          </button>
        ))}
      </p>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render({
  number: 0,
});
