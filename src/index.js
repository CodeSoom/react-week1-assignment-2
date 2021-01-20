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

let result = 0;
const stack = new Stack();

function render() {
  function operate() {
    if (stack.size() < 2) return;
    const op = stack.pop();
    const number = stack.pop();

    result = eval(number + op + result);
    stack.push(result);
    render();
  }

  function handleNumber(number) {
    result *= 10;
    result += number;
    render();
  }

  function getResult() {
    operate();
    stack.pop();
    result = 0;
  }

  function plus() {
    operate();
    stack.push(result);
    stack.push('+');
    result = 0;
  }

  function minus() {
    operate();
    stack.push(result);
    stack.push('-');
    result = 0;
  }

  function multiply() {
    operate();
    stack.push(result);
    stack.push('*');
    result = 0;
  }

  function divide() {
    operate();
    stack.push(result);
    stack.push('/');
    result = 0;
  }
  
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{result}</p>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
        <button type="button" onClick={() => handleNumber(i)}>
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
