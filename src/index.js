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
let savedSign = '';

function maths(leftNumber, rightNumber, saveSign) {
  let left = Number(leftNumber);
  const right = Number(rightNumber);
  if (saveSign === '+') {
    left += right;
  } else if (saveSign === '-') {
    left -= right;
  } else if (saveSign === '*') {
    left *= right;
  } else if (saveSign === '/') {
    left /= right;
  }
  savedSign = '';
  return left;
}

const numberList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const signList = ['+', '-', '*', '/', '='];

function render(leftNumber, rightNumber, paraSign) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="result">
        {
          savedSign === ''
            ? leftNumber
            : rightNumber
        }
      </p>
      <p>
        {
          (function a() {
            if (paraSign !== '') savedSign = paraSign;
            return '';
          }())
        }
        {
          savedSign === ''
            ? numberList.map((clickedNumber) => (
              <button type="button" onClick={() => render(leftNumber + clickedNumber, rightNumber, '')}>
                {clickedNumber}
              </button>
            ))
            : numberList.map((clickedNumber) => (
              <button type="button" onClick={() => render(leftNumber, rightNumber + clickedNumber, '')}>
                {clickedNumber}
              </button>
            ))
        }
      </p>
      <p>
        {
          savedSign === ''
            ? signList.map((clickedSign) => (
              <button type="button" onClick={() => render(leftNumber, rightNumber, clickedSign)}>
                {clickedSign}
              </button>
            ))
            : signList.map((clickedSign) => (
              <button type="button" onClick={() => render(maths(leftNumber, rightNumber, savedSign), '', clickedSign)}>
                {clickedSign}
              </button>
            ))
        }
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render('', '', '');
