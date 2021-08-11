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

const initNum = 0;
const digits = []; // 사용자가 입력하는 숫자를 자릿수별로 배열에 담는다. 예. 123 입력 -> [1, 2, 3]
const userInputs = []; // 사용자가 입력한 숫자, 연산자 모음

function calculate() {
  const opr = userInputs[1];
  if (opr === '+') {
    return userInputs[0] + userInputs[2];
  }
  if (opr === '-') {
    return userInputs[0] - userInputs[2];
  }
  if (opr === '*') {
    return userInputs[0] * userInputs[2];
  }
  if (opr === '/') {
    return userInputs[0] / userInputs[2];
  }
  return 0;
}

function render(visibleNum) {
  function handleClickNumber(num) {
    digits.push(num);
    render(parseInt(digits.join(''), 10));
  }

  function handleClickOperator(opr) {
    // * 잘못된 입력 처리 *
    // 1. 입력한 숫자가 전혀 없는 상태에서 연산자만 입력했을 경우
    if (digits.length === 0 && userInputs.length === 0) {
      return;
    }
    // 2. '숫자 -> 연산자 -> 연산자' 처럼 연산자를 연속해서 입력했을 경우
    if (digits.length === 0) {
      userInputs.splice(-1, 1, opr);
      return;
    }

    // 이전에 입력된 숫자와 새로 입력된 연산자를 userInputs에 담는다.
    userInputs.push(parseInt(digits.join(''), 10));
    userInputs.push(opr);
    digits.splice(0);

    // * 계산하기 *
    // 숫자 -> '=' 순서로 입력된 경우
    if (opr === '=' && userInputs.length === 2) {
      render(userInputs[0]);
      userInputs.splice(0);
      return;
    }
    // 숫자 -> 연산자 -> 숫자 -> '=' 순서로 입력된 경우
    if (opr === '=' && userInputs.length > 3) {
      const result = calculate();
      render(result);
      userInputs.splice(0);
      return;
    }
    // 연속해서 숫자와 연산자를 입력하는 경우 중간 계산 결과 구하기
    if (userInputs.length > 3) {
      const result = calculate();
      userInputs.splice(0, 3, result);
      render(result);
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <span id="screen">{visibleNum}</span>
      <br />
      <p id="numButtons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button type="button" onClick={() => handleClickNumber(num)}>
            {num}
          </button>
        ))}
      </p>
      <p id="oprButtons">
        {['+', '-', '*', '/', '='].map((opr) => (
          <button type="button" onClick={() => handleClickOperator(opr)}>
            {opr}
          </button>
        ))}
      </p>
    </div>
  );

  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(element);
}

render(initNum);
