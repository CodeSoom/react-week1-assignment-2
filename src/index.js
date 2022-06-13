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

function render({
  operand1 = 0,
  operand2 = 0,
  operator = '',
  errorMessage = '',
} = {}) {
  function getResult() {
    if (operand2) return operand2.toString();

    return operand1.toString() || '';
  }

  // Click Events
  function handleClickNumber(clickedNumber = 0) {
    if (operator) {
      render({
        operand1,
        operator,
        operand2: operand2 * 10 + clickedNumber,
      });
    } else {
      render({
        operand1: operand1 * 10 + clickedNumber,
        operator: '',
        operand2,
      });
    }
  }

  function handleClickOperator(operatorKey = '') {
    if (!operand1) return;

    if (!operand2 && !isEqualOperator(operatorKey)) {
      render({
        operand1,
        // 두 번째 피연산자가 없으면 계속 연산자를 업데이트
        operator: operatorKey,
        operand2: '',
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
        operand2: 0,
        operator: isEqualOperator(operator) ? '' : operatorKey,
      });
    } else {
      render({
        operand1: 0,
        operand2: 0,
        operator: '',
        errorMessage: '올바른 수식이 아닙니다!',
      });
    }
  }

  const element = (
    <div className="calculator">
      <p>간단 계산기</p>

      <div className="calculator__result">
        { getResult({ operand1, operand2 }) }
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
