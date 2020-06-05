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
const INPUT_VALUES = [];

function displayValue() {
  if (INPUT_VALUES.length === 3) {
    log(INPUT_VALUES);
    return INPUT_VALUES[2];
  }

  log(INPUT_VALUES);
  return INPUT_VALUES[0];
}

function numberClickHandler(num) {
  if (INPUT_VALUES.length === 2) {
    INPUT_VALUES.push(String(num));

    return displayValue();
  }

  const number = String(INPUT_VALUES.pop() || '') + String(num);
  INPUT_VALUES.push(number);

  return displayValue();
}

function cleanInputValues() {
  INPUT_VALUES.pop();
  INPUT_VALUES.pop();
  INPUT_VALUES.pop();
}

function plus() {
  const result = Number(INPUT_VALUES[0]) + Number(INPUT_VALUES[2]);
  cleanInputValues();
  INPUT_VALUES.push(result);
}

function minus() {
  const result = Number(INPUT_VALUES[0]) - Number(INPUT_VALUES[2]);
  cleanInputValues();
  INPUT_VALUES.push(result);
}

function multiply() {
  const result = Number(INPUT_VALUES[0]) * Number(INPUT_VALUES[2]);
  cleanInputValues();
  INPUT_VALUES.push(result);
}

function divide() {
  const result = Number(INPUT_VALUES[0]) / Number(INPUT_VALUES[2]);
  cleanInputValues();
  INPUT_VALUES.push(result);
}

function calculate() {
  if (INPUT_VALUES[1] === '+') {
    plus();
  }
  if (INPUT_VALUES[1] === '-') {
    minus();
  }
  if (INPUT_VALUES[1] === '*') {
    multiply();
  }
  if (INPUT_VALUES[1] === '/') {
    divide();
  }
}

function operatorClickHandler(operator) {
  if (operator === '=') {
    calculate();
    const result = INPUT_VALUES[0];
    cleanInputValues();
    return result;
  }

  if (INPUT_VALUES.length === 3) {
    calculate();
    INPUT_VALUES.push(operator);
    return displayValue();
  }

  INPUT_VALUES.push(operator);

  return displayValue();
}

function render(value) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{value}</p>
      <p>{NUMBER_PAD.map((num) => <button type="button" onClick={() => render(numberClickHandler(num))}>{num}</button>)}</p>
      <p>{OPERATOR_PAD.map((operator) => <button type="button" onClick={() => render(operatorClickHandler(operator))}>{operator}</button>)}</p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render('0');
