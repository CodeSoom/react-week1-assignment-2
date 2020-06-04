/* eslint-disable no-throw-literal */
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

function calculator(args) {
  if (args[1] === '+') {
    return args[0] + args[2];
  }
  if (args[1] === '-') {
    return args[0] - args[2];
  }
  if (args[1] === '*') {
    return args[0] * args[2];
  }
  if (args[1] === '/') {
    return args[0] / args[2];
  }
  throw 'arguments error!';
}
function attatchNumber(num1, num2) {
  return num1 * 10 + num2;
}
function compressArray(arr) {
  if (arr.length === 0) {
    return [];
  }
  if (arr.length === 1) {
    if (['+', '-', '*', '/'].includes(arr[0])) {
      return [];
    }
    if (arr[0] === '=') {
      return [];
    }
    return arr;
  }
  if (arr.length === 2) {
    if (['+', '-', '*', '/'].includes(arr[1])) {
      return arr;
    }
    if (arr[1] === '=') {
      return arr.splice(1, 1);
    }
    return [attatchNumber(arr[0], arr[1])];
  }
  if (arr.length === 3) {
    if (['+', '-', '*', '/'].includes(arr[2])) {
      return arr.splice(1, 1);
    }
    if (arr[2] === '=') {
      return arr.splice(2, 1);
    }
    return arr;
  }
  if (arr.length === 4) {
    const result = calculator(arr.slice(0, 3));
    if (['+', '-', '*', '/'].includes(arr[3])) {
      return [result, arr[3]];
    }
    if (arr[3] === '=') {
      return [result];
    }
    return [arr[0], arr[1], attatchNumber(arr[2], arr[3])];
  }
  throw 'arguments error!';
}
function calcDisplay(args) {
  if (args.length === 0) {
    return 0;
  }
  if (args.length < 3) {
    return args[0];
  }
  return args[2];
}

function makeButton(name, callback) {
  return <button type="button" onClick={callback}>{name}</button>;
}

function render(arr = []) {
  const formula = compressArray(arr);
  const display = calcDisplay(formula);
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{display}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => makeButton(i, () => render([...formula, i])))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => makeButton(i, () => render([...formula, i])))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
