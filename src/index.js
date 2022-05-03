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

const initialState = {
  previousValue: '0',
  currentValue: '0',
  currentOperator: '',
  status: 'operand',
};

const sum = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => Number(a) - Number(b);
const multiply = (a, b) => Number(a) * Number(b);
const divide = (a, b) => Number(a) / Number(b);

const calculate = (operator, a, b) => {
  switch (operator) {
  case '+':
    return sum(a, b);
  case '-':
    return subtract(a, b);
  case '*':
    return multiply(a, b);
  case '/':
    return divide(a, b);
  default:
    return 0;
  }
};

// COMPLETE: 기능1 : 숫자를 입력하면 입력된 숫자가 표시되고, 연산자를 입력하면 연산자는 표시되지 않습니다.
// COMPLETE: 기능2 : 숫자를 연속으로 누르면 +=연산이 실행됩니다.
// COMPLETE: 기능3 : =은 연산을 실행하고 결과를 표시 그리고 연산자를 초기화합니다.
// COMPLETE: 기능4 : =이 아닌 연산자일지라도 연산을 실행하면 결과를 표시합니다.

function render(state) {
  const {
    previousValue, currentValue, currentOperator, status,
  } = state;
  // console.log('state', state);
  function handleOperand(value) {
    if (status === 'operator') {
      return render({
        ...state,
        currentValue: value,
        status: 'operand',
      });
    }
    if (currentValue[0] === '0') {
      return render({
        ...state,
        currentValue: value,
        status: 'operand',
      });
    }
    return render({
      ...state,
      currentValue: currentValue + value,
      status: 'operand',
    });
  }

  function handleOperator(value) {
    if (value === '=') {
      const result = calculate(currentOperator, previousValue, currentValue);
      return render({
        ...state,
        previousValue: '0',
        currentValue: result.toString(),
        currentOperator: '',
        status: 'operator',
      });
    }
    if (currentOperator) {
      const result = calculate(currentOperator, previousValue, currentValue);
      return render({
        ...state,
        previousValue: result.toString(),
        currentValue: result.toString(),
        currentOperator: value,
        status: 'operator',
      });
    }
    return render({
      ...state,
      previousValue: currentValue,
      currentOperator: value,
      status: 'operator',
    });
  }

  const element = (
    <div id="hello" className="greeting">
      <p>간단 계산기</p>
      <p>{currentValue}</p>
      <p>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((i) => <button type="button" onClick={() => handleOperand(i)}>{i}</button>)}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => <button type="button" onClick={() => handleOperator(i)}>{i}</button>)}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
