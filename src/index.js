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

// 연산자가 있을때 클릭 -> 계산결과 유지, 연산자 유지, currentNumber계산
// 연산자가 없을때 클릭 -> 계산결과 삭제, 연산자 유지, currentNumber계산
function clickNumber(calcResult, operator, currentNumber, number) {
  render(operator !== '' ? calcResult : 0, operator, currentNumber === null ? number : Number(`${currentNumber}${number}`));
}

// 근데 currentNumber가 없다. -> 계산결과 유지, 연산자를 바꾼다, currentNumber null
// 근데 currentNumber가 있다. -> 계산결과 변경, 연산자를 바꾼다, currentNumber null
function clickOperator(calcResult, operator, currentNumber, operatorString) {
  render(currentNumber !== null ? calc(calcResult, operator, currentNumber) : calcResult,
    operatorString, null);
}

function calc(calcResult, operator, currentNumber) {
  switch (operator) {
  case '+':
    return calcResult + currentNumber;
  case '-':
    return calcResult - currentNumber;
  case '*':
    return calcResult * currentNumber;
  case '/':
    return calcResult / currentNumber;
  default: // '=' 3=2 -> 2
    return currentNumber;
  }
}

function render(calcResult, operator, currentNumber) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{currentNumber === null ? calcResult : currentNumber}</p>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => <button type="button" onClick={() => clickNumber(calcResult, operator, currentNumber, number)}>{number}</button>)}
      <br />
      <br />
      {['+', '-', '*', '/', '='].map((operatorString) => <button type="button" onClick={() => clickOperator(calcResult, operator, currentNumber, operatorString)}>{operatorString}</button>)}
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0, '=', 0);
