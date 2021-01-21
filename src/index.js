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

class Stack {
  constructor() {
    this.store = [];
  }

  push(item) {
    this.store.push(item);
  }

  pop() {
    return this.store.pop();
  }

  size() {
    return this.store.length;
  }
}

let numOnDisplay = 0;
const stack = new Stack();

function render() {
  function operate() {
    if (stack.size() < 2) return;
    const op = stack.pop();
    const popedNumber = stack.pop();

    switch (op) {
    case '+':
      numOnDisplay += popedNumber;
      break;
    case '-':
      numOnDisplay = popedNumber - numOnDisplay;
      break;
    case '*':
      numOnDisplay *= popedNumber;
      break;
    case '/':
      numOnDisplay = popedNumber / numOnDisplay;
      break;
    default:
      break;
    }
    stack.push(numOnDisplay);
    render();
  }

  function addDigitRight(number) {
    numOnDisplay *= 10;
    numOnDisplay += number;
    render();
  }

  function getResult() {
    operate();
    stack.pop();
    numOnDisplay = 0;
  }

  function plus() {
    operate();
    stack.push(numOnDisplay);
    stack.push('+');
    numOnDisplay = 0;
  }

  function minus() {
    operate();
    stack.push(numOnDisplay);
    stack.push('-');
    numOnDisplay = 0;
  }

  function multiply() {
    operate();
    stack.push(numOnDisplay);
    stack.push('*');
    numOnDisplay = 0;
  }

  function divide() {
    operate();
    stack.push(numOnDisplay);
    stack.push('/');
    numOnDisplay = 0;
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{numOnDisplay}</p>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
        <button type="button" onClick={() => addDigitRight(i)}>
          {i}
        </button>
      ))}
      <p>
        <button type="button" onClick={plus}>+</button>
        <button type="button" onClick={minus}>-</button>
        <button type="button" onClick={multiply}>*</button>
        <button type="button" onClick={divide}>/</button>
        <button type="button" onClick={getResult}>=</button>
      </p>

    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
