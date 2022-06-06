/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* eslint-disable linebreak-style, no-console, quotes */

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

// operators
const plus = '+';
const minus = '-';
const multiple = '*';
const divide = '/';
const equal = '=';

function handleClickNumber(number) {
  console.log(`클릭한 숫자 : ${number}`);
}

function handleClickOperator(operator) {
  if (operator === plus) {
    console.log(`클릭한 연산자는 : 더하기`);
  } else if (operator === minus) {
    console.log(`클릭한 연산자는 : 빼기`);
  } else if (operator === multiple) {
    console.log(`클릭한 연산자는 : 곱하기`);
  } else if (operator === divide) {
    console.log(`클릭한 연산자는 : 나누기`);
  } else if (operator === equal) {
    console.log(`클릭한 연산자는 : 등호`);
  }
}

function render() {
  const numberPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = [plus, minus, multiple, divide, equal];
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>0(연산 로직 개발예정)</p>
      <div>
        {
          numberPad.map((number) => <button type="button" onClick={() => handleClickNumber(number)}>{number}</button>)
        }
      </div>
      <div>
        {
          operators.map((operator) => <button type="button" onClick={() => handleClickOperator(operator)}>{operator}</button>)
        }
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
