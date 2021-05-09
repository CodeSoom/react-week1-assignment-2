/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* eslint no-console: "off" */
/* @jsx createElement */

// 과제 제출 1차
/** 목표
 * 숫자를 누르면 누른 숫자가 출력되어야 합니다. (완료)
 * 숫자를 연속해서 누르면 숫자가 더해져서 출력되어야 합니다. <- 여기서 부터 시작해야함 ! 
 * 숫자와 연산자를 입력한 후 =를 클릭하면 계산 결과가 출력되어야 합니다. (완료)
 * 연속해서 숫자와 연산자를 입력하면 중간에 계산 결과가 출력되어야 합니다.
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
const numberKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operatorKeys = ['+', '-', '*', '/', '='];

function render({ displayNumber, operation, result }) {
  console.log({ displayNumber, operation, result });

  function calcuation(value) {
    const data = { displayNumber: value, operation, result };
    switch (operation) {
    case '+':
      render({ ...data, result: displayNumber + value });
      break;
    case '-':
      render({ ...data, result: displayNumber - value });
      break;
    case '*':
      render({ ...data, result: displayNumber * value });
      break;
    case '/':
      render({ ...data, result: displayNumber / value });
      break;
    default:
      break;
    }
  }

  function handleClickNumber(value) {
    /** 현재 구현할 기능
     * 숫자를 연속해서 누르면 숫자가 더해져서 출력되어야 합니다.
    */
    if (operation == null) {
      render({ displayNumber: value });
      return;
    }
    calcuation(value);
  }

  function handleClickOperator(value) {
    if (value === '=') {
      render({ displayNumber: result, result: 0 });
      return;
    }
    render({ displayNumber, operation: value });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayNumber || 0}</p>
      <div>
        {numberKeys.map((key) => (
          <button type="button" id={`num${key}`} onClick={() => { handleClickNumber(key); }}>{key}</button>
        ))}
      </div>
      <div>
        {operatorKeys.map((key) => (
          <button type="button" id={`num${key}`} onClick={() => { handleClickOperator(key); }}>{key}</button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ displayNumber: 0, result: 0 });
