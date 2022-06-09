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

// 입력 값 비우기
function clearInputs() {
  updateInputs([]);
}

// 입력한 값이 없는지 판단
function isInputEmpty() {
  return inputs.length === 0;
}

function getLastInput() {
  return inputs[inputs.length - 1] ?? null;
}

// 입력된 값이 연산자인지 판단
function isOperator(operator) {
  return operator && operators.includes(operator);
}

function isEqualOperator(operator) {
  return operator === '=';
}

function isCalculationAvailable() {
  const [num1, operator, num2] = inputs;

  return isOperator(operator) && !!num1 && !!num2;
}

const operations = {
  '+': (num1, num2) => num1 + num2,
  '-': (num1, num2) => num1 - num2,
  '*': (num1, num2) => num1 * num2,
  '/': (num1, num2) => num1 / num2,
};

function calculate() {
  const [num1, operator, num2] = inputs;

  return operations[operator](parseFloat(num1), parseFloat(num2)).toString();
}

function render(result = '') {
  // 버튼 클릭 이벤트 핸들러
  function handleClickNumber(num = 0) {
    if (isInputEmpty()) {
      const newInputs = [...inputs, num];

      updateInputs(newInputs);

      render(num);
      return;
    }

    const lastInput = getLastInput();

    if (isOperator(lastInput)) {
      const newInputs = [...inputs, num];

      updateInputs(newInputs);

      render(num);
    } else {
      const newInput = lastInput + num;

      const newInputs = [...inputs.slice(0, inputs.length - 1), newInput];

      updateInputs(newInputs);

      render(newInput);
    }
  }

  function handleClickOperator(operator = '') {
    if (isInputEmpty()) return;

    const lastInput = getLastInput();

    if (isOperator(lastInput)) return;

    if (isCalculationAvailable()) {
      const calculationResult = calculate();

      updateInputs([calculationResult]);

      render(calculationResult);

      if (!isEqualOperator(operator)) inputs.push(operator);
    } else {
      inputs.push(operator);
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
            <button type="button" onClick={() => handleClickNumber(num)}>
              {num}
            </button>
          ))
        }
        {/* 연산자 키 */}
        {
          operators.map((operator) => (
            <button type="button" onClick={() => handleClickOperator(operator)}>
              {operator}
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
