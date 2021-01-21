/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ['+', '-', '*', '/', '='];
const DEFUALT_OPERATOR = '+';

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

const makeDecimal = (accumulator, currentValue) => accumulator * 10 + currentValue;

function add(operand1, operand2) {
  return operand1 + operand2;
}
function abstract(operand1, operand2) {
  return operand1 - operand2;
}
function multiply(operand1, operand2) {
  return operand1 * operand2;
}
function divide(operand1, operand2) {
  const result = operand1 / operand2;
  return operand1 / operand2;
}

function render(currentNum, result, prevNum, currentOperate, prevOperate) {
  const element = (
    <div>
      <p>간단 계산기</p>

      <p>
        {() => {
          /* if else를 객체로 바꾸기 */
          if (prevOperate === undefined) {
            // 함수를 호출(함수 내에서 innerText를 이용해서 currentNum출력)
          } else if (currentOperate === '=' || (currentOperate !== '=' && prevOperate !== '=')) {
            // 함수를 호출(함수 내에서 innerText를 이용해서 result출력)
          }
        }}
      </p>

      <p>
        {numbers.map((num) => (
          <button
            type="button"
            onClick={() => {
              const operationsTable = {
                '+': add(prevNum, currentNum),
                undefined: add(prevNum, currentNum),
                '-': abstract(prevNum, currentNum),
                '*': multiply(prevNum, currentNum),
                '/': divide(prevNum, currentNum),
              };
              const ArithmeticOperations = (operation) => operationsTable[operation];

              render(currentNum.concat(num), ArithmeticOperations(currentOperate),
                currentNum.reduce(makeDecimal), currentOperate, prevOperate);
            }}
          >
            {num}
          </button>
        ))}
      </p>

      <p>
        {operators.map((operator) => (
          <button
            type="button"
            onClick={() => {
              render(currentNum, result, prevNum, operator, prevOpperate);
            }}
          >
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render([], 0);
