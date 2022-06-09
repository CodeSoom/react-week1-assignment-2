/* eslint-disable linebreak-style */
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

// 엘리먼트
const app = document.getElementById('app');

const operators = ['+', '-', '*', '/', '='];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

/**
 * 입력한 값을 추가할 배열
 *
 * @type {string[]}
 */
let inputs = [];

/*
  🙌 질문 splice를 사용하지 않기 위해서 inputs를 let으로 선언했습니다.
  이때, 직접 값을 할당하는 것보다 값을 할당하는 함수를 만들면 언제 inputs를 업데이트하는지 확인할 수 있을 것 같아서 이 함수를 만들었는데,
  불필요한 로직인지? 궁금합니다.
 */
function updateInputs(newInputs = []) {
  inputs = newInputs;
}

function getLastInput() {
  return inputs[inputs.length - 1] ?? null;
}

// 입력된 값이 연산자인지 판단
function isOperator(value) {
  return value && operators.includes(value);
}

// 입력한 값이 없는지 판단
function isInputEmpty() {
  return inputs.length === 0;
}

// 입력 값 비우기
function clearInputValues() {
  const newInputs = inputs.slice(0, inputs.length);

  updateInputs(newInputs);
}

const calculations = {
  '+': (num1, num2) => num1 + num2,
  '-': (num1, num2) => num1 - num2,
  '*': (num1, num2) => num1 * num2,
  '/': (num1, num2) => num1 / num2,
};

function calculate() {
  const [num1, operator, num2] = inputs;

  return calculations[operator](parseInt(num1, 10), parseInt(num2, 10)).toString();
}

function render(result = '') {
  // 버튼 클릭 이벤트 핸들러
  function handleClick(value) {
    if (!isOperator(value)) {
      if (isInputEmpty()) {
        inputs.push(value);
        render(value);
        return;
      }

      const lastInput = getLastInput();

      if (isOperator(lastInput)) {
        inputs.push(value);
        render(value);
      } else {
        const newInput = lastInput + value;
        inputs.pop();
        inputs.push(newInput);
        render(newInput);
      }
    } else {
      if (isInputEmpty()) return;

      const lastInput = getLastInput();

      if (isOperator(lastInput)) return;

      if (inputs.length === 3) {
        const resultValue = calculate();
        clearInputValues();
        inputs.push(resultValue);
        render(resultValue);

        if (value !== '=') inputs.push(value);
      } else {
        inputs.push(value);
      }
    }
  }

  const element = (
    <div className="calculator">
      <p>간단 계산기</p>

      <div className="calculator__result">
        { result }
      </div>

      <div className="calculator__buttons">
        {/* 숫자 키 */}
        {
          numbers.map((num) => (
            <button type="button" onClick={() => handleClick(num)}>
              {num}
            </button>
          ))
        }
        {/* 연산자 키 */}
        {
          operators.map((o) => (
            <button type="button" onClick={() => handleClick(o)}>
              {o}
            </button>
          ))
        }
      </div>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render();
