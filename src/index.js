/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* eslint no-use-before-define: ["error", { "functions": false }] */
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

function handleNumberClick({
  number, leftOperatedNumber, rightOperatedNumber, currentOperator,
} = {}) {
  if (currentOperator) {
    const resultNumber = rightOperatedNumber ? Number(`${rightOperatedNumber}${number}`) : number;
    render({
      currentNumber: resultNumber,
      leftOperatedNumber,
      rightOperatedNumber: resultNumber,
      currentOperator,
    });
    return;
  }
  const resultNumber = leftOperatedNumber ? Number(`${leftOperatedNumber}${number}`) : number;
  render({
    currentNumber: resultNumber,
    leftOperatedNumber: resultNumber,
    rightOperatedNumber,
    currentOperator,
  });
}

function calculator({ operator, number1, number2 } = {}) {
  if (operator === '+') return number1 + number2;
  if (operator === '-') return number1 - number2;
  if (operator === '*') return number1 * number2;
  if (operator === '/') return number1 / number2;
  throw new Error('Wrong Operator!');
}

function handleOperatorClick({
  operator, currentNumber, leftOperatedNumber, rightOperatedNumber, currentOperator,
} = {}) {
  if (!currentOperator) {
    render({
      currentNumber, leftOperatedNumber, rightOperatedNumber, currentOperator: operator !== '=' && operator,
    });
    return;
  }

  //

  if (operator === '=') {
    if (!rightOperatedNumber) {
      const resultNumber = calculator({
        operator: currentOperator,
        number1: currentNumber,
        number2: currentNumber,
      });
      render({
        currentNumber: resultNumber,
        leftOperatedNumber: 0,
        rightOperatedNumber: currentNumber,
        currentOperator,
      });
      return;
    }

    if (leftOperatedNumber) {
      const resultNumber = calculator({
        operator: currentOperator,
        number1: leftOperatedNumber,
        number2: rightOperatedNumber,
      });
      render({
        currentNumber: resultNumber, leftOperatedNumber: 0, rightOperatedNumber, currentOperator,
      });
      return;
    }

    const resultNumber = calculator({
      operator: currentOperator,
      number1: currentNumber,
      number2: rightOperatedNumber,
    });
    render({
      currentNumber: resultNumber, leftOperatedNumber: 0, rightOperatedNumber, currentOperator,
    });
    return;
  }

  //

  if (leftOperatedNumber) {
    const resultNumber = calculator({
      operator: currentOperator,
      number1: leftOperatedNumber,
      number2: rightOperatedNumber,
    });

    render({
      currentNumber: resultNumber,
      leftOperatedNumber: resultNumber,
      rightOperatedNumber: 0,
      currentOperator: operator,
    });
    return;
  }

  render({
    currentNumber,
    leftOperatedNumber: currentNumber,
    rightOperatedNumber: 0,
    currentOperator: operator,
  });
}

function render({
  currentNumber = 0,
  leftOperatedNumber = 0,
  rightOperatedNumber = 0,
  currentOperator = '',
} = {}) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{currentNumber}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button
            type="button"
            onClick={() => handleNumberClick({
              number, leftOperatedNumber, rightOperatedNumber, currentOperator,
            })}
          >
            {number}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((operator) => (
          <button
            type="button"
            onClick={() => handleOperatorClick({
              operator, currentNumber, leftOperatedNumber, rightOperatedNumber, currentOperator,
            })}
          >
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
