/* eslint-disable no-use-before-define */
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
let flagOperation = false;
let flagEqual = false;
let operatorNum = 0;
let operator = '';
let value = '0';
let result = 0;

const calculate = (a, op, b) => {
  if (op === '+') {
    // console.log(`a::${a} b::${b}`);
    // console.log(Number(a) + Number(b));
    return Number(a) + Number(b);
  }
  if (op === '-') {
    return Number(a) - Number(b);
  }
  if (op === '*') {
    return Number(a) * Number(b);
  }
  if (op === '/') {
    return Number(a) / Number(b);
  }
  return false;
};

function buttonclick(i) {
  console.log(flagOperation);
  if (flagEqual) {
    value = i;
    flagOperation = false;
    flagEqual = false;
    render();
    return;
  }
  if (flagOperation) {
    if (operatorNum > 1) {
      result = calculate(result, operator, i);
      // console.log(`value::${value} i::${i} result:${result}`);
      value = result;
    } else {
      result = calculate(value, operator, i);
      // console.log(`value::${value} i::${i} result:${result}`);
      value = i;
    }
    flagOperation = false;
  } else if (value === '0') {
    value = i;
  } else {
    value += i;
  }
  render();
}

function checkOperator(nowOperator) {
  operator = nowOperator;
  operatorNum += 1;
  flagOperation = true;
  if (nowOperator === '=') {
    value = result;
    operatorNum = 0;
    result = 0;
    flagEqual = true;
  }
  render();
}

function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {value}
      </p>
      <p>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((i) => (
          <button type="button" onClick={() => buttonclick(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {' '}
        {['+', '-', '*', '/', '='].map((nowOperator) => (
          <button
            type="button"
            onClick={() => checkOperator(nowOperator)}
          >
            {nowOperator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
