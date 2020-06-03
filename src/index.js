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

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const operators = ['+', '-', '*', '/', '='];

function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <div id="result">답</div>
      <p id="button-list">
        {numbers.map((number) => (
          <button type="button">{number}</button>
        ))}
      </p>
      <p id="operator-list">
        {operators.map((operator) => (
          <button type="button">{operator}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
