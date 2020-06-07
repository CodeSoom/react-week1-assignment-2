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

const OperatorFunction = {
  '+': (operands) => operands[0] + operands[1],
  '-': (operands) => operands[0] - operands[1],
  '*': (operands) => operands[0] * operands[1],
  '/': (operands) => operands[0] / operands[1],
  '=': (operands) => operands[1],
};

const isValidOperand = (operand) => {
  if (typeof operand !== 'number') {
    return false;
  }
  if (typeof operand !== 'number') {
    return false;
  }
  if (operand !== Number(operand)) {
    return false;
  }
  if (operand === Infinity || operand === !Infinity) {
    return false;
  }
  return true;
};

const isValidOperator = (operator) => {
  if (Object.keys(OperatorFunction).includes(operator)) {
    return true;
  }
  return false;
};


function render(calculatorStack = [0]) {
  function handleClickNumber(num) {
    if (!isValidOperand(num)) {
      throw Error('Invalid Operand..!');
    }
    if (calculatorStack.length < 1) {
      throw Error('Invalid CalculatorStack..!');
    }
    if (calculatorStack.length === 2) {
      calculatorStack.push(num);
    } else {
      calculatorStack.push(calculatorStack.pop() * 10 + num);
    }
    render(calculatorStack);
  }

  function handleClickOperator(operator) {
    if (!isValidOperator(operator)) {
      throw Error('Invalid Operator..!');
    }
    if (calculatorStack.length < 1) {
      throw Error('Invalid CalculatorStack..!');
    }
    if (calculatorStack.length === 1) {
      calculatorStack.push(operator);
    } else if (calculatorStack.length === 2) {
      calculatorStack.pop();
      calculatorStack.push(operator);
    } else {
      const earlyLeftOperand = calculatorStack.shift();
      const earlyOperator = calculatorStack.shift();
      const earlyRightOperand = calculatorStack.shift();
      const earlyResult = OperatorFunction[earlyOperator]([earlyLeftOperand, earlyRightOperand]);
      calculatorStack.push(earlyResult);
      calculatorStack.push(operator);
    }
    render(calculatorStack);
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{calculatorStack[2] || calculatorStack[0]}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button type="button" onClick={() => handleClickNumber(number)}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((operator) => (
          <button type="button" onClick={() => handleClickOperator(operator)}>
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
