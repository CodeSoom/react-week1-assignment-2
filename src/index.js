/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

// porps
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
let number = '';
let operator = '';
let answer = '';

function handleClickNumber(n) {
  if (number === '') {
    document.getElementById('answer').textContent = `${n}`;
    number += `${n}`;
  } else {
    number += n;
    document.getElementById('answer').textContent = `${number}`;
  }
}

function handleClickOperator(o) {
  if (o === '=') {
    answer *= 1; number *= 1;
    if (operator === '+') {
      answer += number;
      document.getElementById('answer').textContent = `${answer}`;
    } else if (operator === '-') {
      answer -= number;
      document.getElementById('answer').textContent = `${answer}`;
    } else if (operator === '*') {
      answer *= number;
      document.getElementById('answer').textContent = `${answer}`;
    } else if (operator === '/') {
      answer /= number;
      document.getElementById('answer').textContent = `${answer}`;
    }
    answer = ''; operator = ''; number = '';
  } else {
    operator += o;
    answer = number;
    number = '';
  }
}

function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="answer">0</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button type="button" onClick={() => handleClickOperator(i)}>
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
