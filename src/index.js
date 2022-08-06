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

function calculator({ operator, number1, number2 } = {}) {
  const calculate = {
    '+': number1 + number2,
    '-': number1 - number2,
    '*': number1 * number2,
    '/': number1 / number2,
  };
  if (calculate[operator]) return calculate[operator];
  throw new Error('Wrong Operator!');
}

function pickOperator(operator) {
  return operator !== '=' && operator;
}

function render({
  currentNumber = 0,
  leftOperatedNumber = 0,
  rightOperatedNumber = null,
  currentOperator = '',
} = {}) {
  function handleNumberClick(number) {
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

  function handleOperatorClick(operator) {
    if (!currentOperator) {
      render({
        currentNumber,
        leftOperatedNumber,
        rightOperatedNumber,
        currentOperator: pickOperator(operator),
      });

      return;
    }

    //

    if (operator === '=') {
      if (rightOperatedNumber === null) {
        const resultNumber = calculator({
          operator: currentOperator,
          number1: currentNumber,
          number2: currentNumber,
        });

        render({
          currentNumber: resultNumber,
          leftOperatedNumber: null,
          rightOperatedNumber: currentNumber,
          currentOperator,
        });

        return;
      }

      if (leftOperatedNumber === null) {
        const resultNumber = calculator({
          operator: currentOperator,
          number1: currentNumber,
          number2: rightOperatedNumber,
        });

        render({
          currentNumber: resultNumber,
          leftOperatedNumber: null,
          rightOperatedNumber,
          currentOperator,
        });

        return;
      }

      const resultNumber = calculator({
        operator: currentOperator,
        number1: leftOperatedNumber,
        number2: rightOperatedNumber,
      });

      render({
        currentNumber: resultNumber, leftOperatedNumber: null, rightOperatedNumber, currentOperator,
      });

      return;
    }

    //

    if (leftOperatedNumber === null) {
      render({
        currentNumber,
        leftOperatedNumber: currentNumber,
        rightOperatedNumber: 0,
        currentOperator: operator,
      });

      return;
    }

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
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{currentNumber}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button
            type="button"
            onClick={() => handleNumberClick(number)}
          >
            {number}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((operator) => (
          <button
            type="button"
            onClick={() => handleOperatorClick(operator)}
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
