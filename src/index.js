/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* eslint-disable no-use-before-define */
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

const temp = {
  num1: 0.0,
  num2: 0.0,
  기호: '',
};

function 숫자입력(value) {
  if (temp.기호 === '') {
    temp.num1 = (temp.num1 * 10) + value;
    render(temp.num1);
  } else {
    temp.num2 = (temp.num2 * 10) + value;
    render(temp.num2);
  }
}

function 연산기호입력(value) {
  if (temp.num2 !== 0) {
    연산결과();
    temp.기호 = value;
  } else {
    temp.기호 = value;
  }
}

function 덧셈() {
  temp.num1 += temp.num2;
}

function 뺄셈() {
  temp.num1 -= temp.num2;
}

function 곱셈() {
  temp.num1 *= temp.num2;
}

function 나눗셈() {
  temp.num1 /= temp.num2;
}

function 연산결과() {
  switch (temp.기호) {
    case '+':
      덧셈(temp);
      break;
    case '-':
      뺄셈(temp);
      break;
    case '*':
      곱셈(temp);
      break;
    case '/':
      나눗셈(temp);
      break;
    default:
      return;
  }
  temp.num2 = 0;
  render(temp.num1);
}


function render(displayNumber = 0) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayNumber}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => 숫자입력(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/'].map((i) => (
          <button type="button" onClick={() => 연산기호입력(i)}>
            {i}
          </button>
        ))}
        <button type="button" onClick={() => 연산결과()}>
          =
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
