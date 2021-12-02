/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */

const $app = document.getElementById('app');
const NUMBER_PAD_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const OPERATOR_LIST = ['+', '-', '*', '/', '='];

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

function render(count = 0) {
  const $element = (
    <div>
      <p>간단 계산기</p>
      <p>{count}</p>
      <div>
        {NUMBER_PAD_LIST.map((number) => (
          <button type="button">{number}</button>
        ))}
      </div>
      <div>
        {OPERATOR_LIST.map((operation) => (
          <button type="button">{operation}</button>
        ))}
      </div>
    </div>
  );

  $app.textContent = '';
  $app.appendChild($element);
}

render();
