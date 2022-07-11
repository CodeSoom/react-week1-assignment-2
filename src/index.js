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

// 넘버배열
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

// 사칙연산
const operators = ['+', '-', '*', '/', '='];

// 입력 받는 값
const state = {
  numberInput: 0, // 버튼 클릭 시 입력 받는 숫자
  displayNumber: 0, // 보여지는 현재 숫자
  storedOperator: '', // 클릭된 사칙연산
  storedNumber: 0, // 선택한 이전의 숫자
};

// 계산기 함수
function calculate() {
  if(state.storedOperator === "+"){
    return state.storedNumber + state.numberInput;

  }else if(state.storedOperator === "-"){
    return state.storedNumber - state.numberInput;

  }else if(state.storedOperator === "*"){
    return state.storedNumber * state.numberInput;

  }else if(state.storedOperator === "/"){
    return state.storedNumber / state.numberInput;

  }
}

// 숫자 클릭 함수
function showNumber(i) {
  if (state.numberInput === 0) {
    state.numberInput = i; // numberInput 0이면 선택한 수의 값 i가 됨

    console.log(state.numberInput); 
  } else { // numberInput 0이 아니라면? 
    state.numberInput = Number(String(state.numberInput) + String(i));  // 문자를 숫자로 변경해주기 아래의 코드로 하면 사칙연산에서 계속 뒤에 붙여줌
    // state.numberInput = state.numberInput + String(i);

    console.log(state.numberInput);
  }

  state.displayNumber = state.numberInput;

  render(); // 실행해
}

// 계산 클릭 함수
function equalFunction(i) {
  if (i === '=') { // 클릭한 버튼이 = 이면
    if (state.storedOperator === '') { // storedOperator에 빈값을 체크하는 이유는? 빈값은 계산을 할 필요가 없으니까
      state.displayNumber = state.numberInput;
      
      alert('숫자를 먼저 입력해주세요.');

      return false;
    } else {
      state.displayNumber = calculate(); 
      console.log(state.displayNumber);
    }
    state.storedOperator = '';

    state.numberInput = 0;

    return render(); 
  }
  if (state.storedOperator === '') {
    state.storedOperator = i;

    state.storedNumber = state.displayNumber;
  } else {
    state.displayNumber = calculate();

    state.storedNumber = i;
  }
  state.numberInput = 0;

  state.storedNumber = state.displayNumber;

  render();
}

function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{state.displayNumber}</p>
      <p>
        {numbers.map((i) => (
          <button type="button" onClick={() => showNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {operators.map((i) => (
          <button type="button" onClick={() => equalFunction(i)}>
            {i}
          </button>
       ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
