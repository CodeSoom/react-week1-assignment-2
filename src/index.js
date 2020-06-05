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

function getDisplayValue(prevValue, currValue) {
  return prevValue + currValue;
}

function calculateAppender(targetValue, operator) {
  log(targetValue + operator);
  return '';
}

function render(displayValue) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayValue}</p>
      <p>{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => <button type="button" onClick={() => render(getDisplayValue(displayValue, num))}>{num}</button>)}</p>
      <p>{['+', '='].map((operator) => <button type="button" onClick={() => render(calculateAppender(displayValue, operator))}>{operator}</button>)}</p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render('');
