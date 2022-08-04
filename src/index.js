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

function isExistCurrentNumber(currentNumber) {
  return currentNumber !== null;
}

function clickNumber(calcResult, operator, currentNumber, number, callBackFunc) {
  callBackFunc(calcResult, operator, isExistCurrentNumber(currentNumber) ? Number(`${currentNumber}${number}`) : number);
}

function clickOperator(calcResult, operator, currentNumber, operatorString, callBackFunc) {
  callBackFunc((isExistCurrentNumber(currentNumber) ? calc(calcResult, operator, currentNumber)
    : calcResult), operatorString, null);
}

function render(calcResult, operator, currentNumber) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{isExistCurrentNumber(currentNumber) ? currentNumber : calcResult}</p>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => <button type="button" onClick={() => clickNumber(calcResult, operator, currentNumber, number, render)}>{number}</button>)}
      <br />
      <br />
      {['+', '-', '*', '/', '='].map((operatorString) => <button type="button" onClick={() => clickOperator(calcResult, operator, currentNumber, operatorString, render)}>{operatorString}</button>)}
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0, '=', 0);
