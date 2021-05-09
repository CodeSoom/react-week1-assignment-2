/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* eslint no-console: "off" */
/* @jsx createElement */

// 과제 제출 1차
/** 목표
 * 숫자를 누르면 누른 숫자가 출력되어야 합니다. (완료)
 * 숫자를 연속해서 누르면 숫자가 더해져서 출력되어야 합니다. (완료)
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
const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const operatorKeys = ['+', '-', '*', '/', '='];

function render({
  displayNumber, operation, tmpResult, lastInput,
}) {
  const props = {
    displayNumber, operation, tmpResult, lastInput,
  };
  console.log(props);

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
    console.log('계산 결과 확인 ! ', result);
    render({displayNumber: result, tmpResult: value === '='? 0 : result, operation: value === '='? '':operation, lastInput:value});
  }

  function handleClick(value) { // 통합 클릭 함수
    // 연산 조작 버튼을 클릭한 경우 
    if (operatorKeys.some((key) => key === value)) {
      if (value === '=') {
        calcuation(value);
        return;
      }
      if(operation == null){
        render({
          ...props, operation: value, tmpResult: parseInt(displayNumber, 10), lastInput: value,
        });
        return;
      }
      console.log("연속해서 숫자와 연산 숫자 연산을 누를때");
      calcuation(value);
      return
    }
    // 숫자 패드 클릭한 경우
    if (lastInput === '=') {//새로운 계산을 시작한 경우
      render({ displayNumber: value, tmpResult: parseInt(value, 10), lastInput: value });
      return;
    }
    if (operatorKeys.some((key) => key === lastInput)) {// 이전에 눌린 키가 연산관련키라면,
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
          <button type="button" id={`num${key}`} onClick={() => { handleClick(key); }}>{key}</button>
        ))}
      </div>
      <div>
        {operatorKeys.map((key) => (
          <button type="button" id={`operation${key}`} onClick={() => { handleClick(key); }}>{key}</button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ displayNumber: '', tmpResult: 0 });
