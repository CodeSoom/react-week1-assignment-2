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


// x + y
// x : left number, 결과값
// resultNum
let resultNum = 0;

// y : right number, 입력 받을 숫자
let inputNum = 0;
// 연산자 변수, 첫 연산자 초기화
let nowOp = '+';

// 계산기 숫자 패드
const calNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
// 계산기 연산자
const calOp = ['+', '-', '*', '/', '='];

// 계산기 숫자 입력
function calInput(i) {
  if (inputNum === 0) {
    inputNum = i;
  } else inputNum = inputNum * 10 + i;

  return inputNum;
}

function calEqual(left, right, op) {
  inputNum = 0;
  switch (op) {
  case '+':
    resultNum = left + right;
    break;
  case '-':
    resultNum = left - right;
    break;
  case '*':
    resultNum = left * right;
    break;
  case '/':
    resultNum = left / right;
    break;
  case '=':
    break;
  default:
  }
}

// 연산자 클릭시 동작
function calFormula(op) {
  calEqual(resultNum, inputNum, nowOp);

  nowOp = op;

  return resultNum;
}

function render(calValue) {
  const element = (
    <div id="calculator">
      <p>간단 계산기</p>
      <p>{calValue}</p>
      <p>
        {calNum.map((i) => (
          <button type="button" onClick={() => render(calInput(i))}>{i}</button>
        ))}
      </p>
      <p id="operator">
        {calOp.map((i) => (
          <button type="button" onClick={() => render(calFormula(i))}>{i}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0);
