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

function createNumbers() {
  const numbers = [];

  for (let i = 0; i < 10; i += 1) {
    numbers.push(i);
  }

  return numbers;
}

// 엘리먼트
const app = document.getElementById('app');

const operators = ['+', '-', '*', '/', '='];
const numbers = createNumbers();

function isEqualOperator(operator) {
  return operator === '=';
}

const operations = {
  '+': (num1, num2) => num1 + num2,
  '-': (num1, num2) => num1 - num2,
  '*': (num1, num2) => num1 * num2,
  '/': (num1, num2) => num1 / num2,
};

function calculate({ operand1, operator, operand2 }) {
  return operations[operator](parseFloat(operand1), parseFloat(operand2));
}

// https://stackoverflow.com/questions/8525899/how-to-check-if-a-javascript-number-is-a-real-valid-number
function isValidNumber(num = 0) {
  return typeof num === 'number' && !Number.isNaN(num) && Number.isFinite(num);
}

function updateOperand(operand, number) {
  return (operand ?? 0) * 10 + number;
}

function render({
  operand1 = null,
  operand2 = null,
  operator = '',
  errorMessage = '',
} = {}) {
  function getResult() {
    if (operand2 !== null) return operand2;

    return operand1 ?? '';
  }

  // Click Events
  function handleClickNumber(clickedNumber = 0) {
    if (operator) {
      render({
        operand1,
        operator,
        operand2: updateOperand(operand2, clickedNumber),
      });
    } else {
      render({
        operand1: updateOperand(operand1, clickedNumber),
      });
    }
  }

  function handleClickOperator(operatorKey = '') {
    if (operand1 === null) return;

    if (operand2 === null && !isEqualOperator(operatorKey)) {
      render({
        operand1,
        // 두 번째 피연산자가 없으면 계속 연산자를 업데이트
        operator: operatorKey,
      });

      return;
    }

    const calculateResult = calculate({
      operand1,
      operand2,
      operator,
    });

    if (isValidNumber(calculateResult)) {
      render({
        operand1: calculateResult,
        operand2: null,
        operator: isEqualOperator(operator) ? '' : operatorKey,
      });
    } else {
      render({
        operand1: null,
        operand2: null,
        operator: '',
        errorMessage: '올바른 수식이 아닙니다!',
      });
    }
  }

  const element = (
    <div className="calculator">
      <p>간단 계산기</p>

      <div className="calculator__result">
        { getResult() }
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
          operators.map((operatorKey) => (
            <button type="button" onClick={() => handleClickOperator(operatorKey)}>
              {operatorKey}
            </button>
          ))
        }
      </div>

      <div className="calculator__errors">
        { errorMessage }
      </div>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render();
