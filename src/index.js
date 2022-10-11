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

const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ['+', '-', '*', '/', '='];
const calculFnc = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
  '=': (x, y) => x || y,
};

function handleNum(value) {}

function handleSum() {}

function calculate() {}

function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{result}</p>
      <div>
        {num.map((i) => (
          <button type="button" onClick={() => handleNum(i)}>
            {i}
          </button>
        ))}
      </div>
      <div>
        {operators.map((i) => (
          <button type="button" onClick={handleSum}>
            {i}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
