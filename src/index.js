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

let totalArray = [];
let numericArray = [];

function calculation(first, expression, second) {
  if (expression === '+') {
    return Number(first) + Number(second);
  }
  if (expression === '-') {
    return Number(first) - Number(second);
  }
  if (expression === '*') {
    return Number(first) * Number(second);
  }
  if (expression === '/') {
    return Number(first) / Number(second);
  }
  return first;
}

function isNumber(v) {
  const reg = /^(\s|\d)+$/;
  return reg.test(v);
}

function convertToMathematicalExpression(array) {
  const result = [array[0].toString()];
  for (let i = 1; i < array.length; i += 1) {
    const value = array[i];
    if (isNumber(value)) {
      if (isNumber(result[result.length - 1])) {
        result[result.length - 1] = `${result[result.length - 1] + value}`;
      } else {
        result.push(value);
      }
    } else {
      result.push(value);
    }
  }

  return result;
}

function display(input, isNumeric) {
  if (isNumeric) {
    numericArray.push(input);
    return numericArray.join('');
  }

  const join = numericArray.join('');

  if (!isNumeric) {
    totalArray.push(join);
    numericArray = [];
    totalArray.push(input);
    const copy = [...totalArray];
    copy[copy.length - 1] = '=';
    const expression = convertToMathematicalExpression(copy);
    let result = expression[0];
    for (let i = 0; i < expression.length; i += 1) {
      const value = expression[i];
      if (!(Number(value) > -1)) {
        result = calculation(result, value, expression[i + 1]);
      }
    }
    return result;
  }

  if (input === '=') {
    const expression = convertToMathematicalExpression(totalArray);
    totalArray = [];
    numericArray = [];
    let result = expression[0];
    for (let i = 0; i < expression.length; i += 1) {
      const value = expression[i];
      if (!(Number(value) > -1)) {
        result = calculation(result, value, expression[i + 1]);
      }
    }
    return result;
  }

  return join;
}

function render(input = 0) {
  const element = (
    <div>
      <p>
        간단 계산기
      </p>
      <p>
        {input}
      </p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button
            type="button"
            onClick={() => {
              render(display(i, true));
            }}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button
            type="button"
            onClick={() => {
              render(display(i, false));
            }}
          >
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
