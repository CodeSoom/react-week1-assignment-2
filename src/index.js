/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* eslint no-console: "off" */
/* @jsx createElement */

// 1-2 과제 제출 1차
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
/** const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const operatorKeys = ['+', '-', '*', '/', '='];

function render({
  displayNumber, operation, tmpResult, lastInput,
}) {
  const props = {
    displayNumber, operation, tmpResult, lastInput,
  };
  // console.log(props);

  function calcuation(value) {
    let result = 0;
    switch (operation) {
    case '+':
      result = tmpResult + parseInt(displayNumber, 10);
      break;
    case '-':
      result = tmpResult - parseInt(displayNumber, 10);
      break;
    case '*':
      result = tmpResult * parseInt(displayNumber, 10);
      break;
    case '/':
      result = tmpResult / parseInt(displayNumber, 10);
      break;
    default:
      break;
    }
    // console.log('계산 결과 확인 ! ', result);
    render({
      displayNumber: result,
      tmpResult: value === '=' ? 0 : result,
      operation: value === '=' ? '' : value,
      lastInput: value,
    });
  }

  function handleClick(value) { // 통합 클릭 함수
    // 연산 조작 버튼을 클릭한 경우
    if (operatorKeys.some((key) => key === value)) {
      if (value === '=') {
        calcuation(value);
        return;
      }
      if (operation == null) {
        render({
          ...props, operation: value, tmpResult: parseInt(displayNumber, 10), lastInput: value,
        });
        return;
      }
      console.log('연속해서 숫자와 연산 숫자 연산을 누를때');
      calcuation(value);
      return;
    }
    // 숫자 패드 클릭한 경우
    if (lastInput === '=') { // 새로운 계산을 시작한 경우
      render({ displayNumber: value, tmpResult: parseInt(value, 10), lastInput: value });
      return;
    }
    if (operatorKeys.some((key) => key === lastInput)) { // 이전에 눌린 키가 연산관련키라면,
      render({ ...props, displayNumber: value, lastInput: value });
      return;
    }
    render({ ...props, displayNumber: displayNumber + value, lastInput: value });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayNumber || 0}</p>
      <div>
        {numberKeys.map((key) => (
          <button
            type="button"
            id={`num${key}`}
            onClick={() => { handleClick(key); }}>{key}</button>
        ))}
      </div>
      <div>
        {operatorKeys.map((key) => (
          <button
            type="button"
            id={`operation${key}`}
            onClick={() => { handleClick(key); }}>{key}</button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ displayNumber: '', tmpResult: 0 });
*/

// 1-2 과제 풀이 : ㄱ 따라하기

const initialState = { accumalator: 0, number: null, operator: '' };

const operatorFuncions = { // 객체 인스턴스에 함수 저장한 방식
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};
function or(x, y) {
  return x === null ? y : x;
}
function defaultFuncion(x, y) {
  return or(y, x);
}

function calculate(accumalator, number, operator) {
  console.log(accumalator, number, operator);
  return (operatorFuncions[operator] || defaultFuncion)(accumalator, number);
}
function render({ accumalator, number, operator }) {
  function handleClickNumber(value) {
    render({
      accumalator,
      number: (number || 0) * 10 + value,
      operator,
    });
  }
  function handleClickOperator(value) {
    render({
      accumalator: calculate(accumalator, number, operator),
      number: null,
      operator: value,
    });
  }
  function handleClickReset() {
    render(initialState);
  }
  const element = (
    <div id="hello" className="greeting">
      <p>{or(number, accumalator)}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((value) => (
          <button
            type="button"
            onClick={() => { handleClickNumber(value); }}
          >
            {value}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((value) => (
          <button type="button" onClick={() => { handleClickOperator(value); }}>{value}</button>
        ))}
        <button type="button" onClick={handleClickReset}>reset</button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
