/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const { log } = console;

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

const NUMBER_PAD = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const OPERATOR_PAD = ['+', '-', '/', '*', '='];

function appendNumbers(prevValue, inputValue) {
  const parsedPrevValue = (prevValue === 0) ? '' : String(prevValue);
  return parsedPrevValue + String(inputValue);
}

function render(displayValue) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayValue}</p>
      <p>{NUMBER_PAD.map((num) => <button type="button" onClick={() => render(appendNumbers(displayValue, num))}>{num}</button>)}</p>
      <p>{OPERATOR_PAD.map((operator) => <button type="button">{operator}</button>)}</p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0);
