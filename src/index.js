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

function calculate(previousNumber, operator, afterNumber) {
  if (operator === '+') {
    return previousNumber + afterNumber;
  }

  if (operator === '-') {
    return previousNumber - afterNumber;
  }

  if (operator === '*') {
    return previousNumber * afterNumber;
  }

  return previousNumber / afterNumber;
}

function handleClickNumber(
  previousNumber,
  operator,
  afterNumber,
  temporaryResult,
) {
  // 연산이 끝난 뒤 숫자를 눌렀을때
  if (operator === '=') {
    render(afterNumber);
    return;
  }

  if (operator === null) {
    // 눌린 연산자가 없고 화면에 그려진 숫자가 0일때
    if (previousNumber === 0) {
      render(afterNumber);
      return;
    }
    // 눌린 연산자가 없고 화면에 그려진 숫자가 0이 아닐때 숫자 합치기
    render(previousNumber + String(afterNumber), operator, temporaryResult);
    return;
  }

  // 중간 계산결과가 없을떄 이전 숫자와 연산
  if (temporaryResult === 0) {
    render(
      afterNumber,
      operator,
      calculate(previousNumber, operator, afterNumber),
    );
    return;
  }

  // 이전 숫자가 아닌 중간 계산결과와 연산
  render(
    afterNumber,
    operator,
    calculate(temporaryResult, operator, afterNumber),
  );
}

function handleClickOperator(number, operator, temporaryResult) {
  if (operator === '=') {
    render(temporaryResult, operator);
    return;
  }

  // 중간 계산결과가 있다면 화면에 그 결과를 보여준다.
  if (temporaryResult !== 0) {
    render(temporaryResult, operator, temporaryResult);
    return;
  }

  render(number, operator, temporaryResult);
}

function render(number = 0, operator = null, temporaryResult = 0) {
  const element = (
    <div>
      <p>간단 계산기</p>
      {number}
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button
            type="button"
            onClick={() => handleClickNumber(number, operator, i, temporaryResult)}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((o) => (
          <button
            type="button"
            onClick={() => handleClickOperator(number, o, temporaryResult)}
          >
            {o}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
