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

const calculatorActions = {
  '+': sum,
  '-': subtract,
  '*': multiply,
  '/': divide,
};

const calculate = (operator, a, b) => (calculatorActions)[operator](a, b);

function render(state) {
  const {
    previousValue, currentValue, currentOperator, status,
  } = state;

  function handleOperand(value) {
    if (status === 'operator') {
      return render({
        ...state,
        currentValue: value,
        status: 'operand',
      });
    }

    return render({
      ...state,
      currentValue: currentValue === '0' ? value : (currentValue + value),
      status: 'operand',
    });
  }

  function handleOperator(value) {
    if (value === '=') {
      const result = calculate(currentOperator, previousValue, currentValue);
      return render({
        ...initialState,
        currentValue: result.toString(),
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
