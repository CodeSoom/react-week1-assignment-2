/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

/*
  [나의 목표]
  함수는 단 한가지 일만 하도록 만들어보자.
*/

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

const numbers = [...Array.from({ length: 9 }, (v, i) => i + 1), 0]; // 1 ~ 9 ~ 0
const operator = ['+', '-', '*', '/', '='];

function calc([firstNumber, operation, secondNumber]) {
  let acc = Number(firstNumber);
  if (operation === '+') {
    acc += Number(secondNumber);
  } else if (operation === '-') {
    acc -= Number(secondNumber);
  } else if (operation === '*') {
    acc *= Number(secondNumber);
  } else if (operation === '/') {
    acc /= Number(secondNumber);
  }

  return acc;
}

function render({ number, operationAndNumberArr, isNewNumber }) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number}</p>
      <p>
        {numbers.map((value) => (
          <button
            type="button"
            onClick={() => {
              let newNumber = number;
              let newIsNewNumber = isNewNumber;

              if (newIsNewNumber) {
                newNumber = '';
                newIsNewNumber = false;
              }

              newNumber = Number(String(newNumber) + value);
              render({
                number: newNumber,
                operationAndNumberArr,
                isNewNumber: newIsNewNumber,
              });
            }}
          >
            {value}
          </button>
        ))}
      </p>
      <p>
        {operator.map((value) => (
          <button
            type="button"
            onClick={() => {
              operationAndNumberArr.push(number);
              operationAndNumberArr.push(value);

              if (operationAndNumberArr.length > 2) {
                operationAndNumberArr.unshift(calc(operationAndNumberArr.splice(0, 3)));
              }

              render({
                number: operationAndNumberArr[0],
                operationAndNumberArr,
                isNewNumber: true,
              });
            }}
          >
            {value}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  number: 0,
  operationAndNumberArr: [],
  isNewNumber: false,
});
