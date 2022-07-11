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

function calculator({ operand1, operand2, operator }) {
  const operators = {
    '+': operand1 + operand2,
    '-': operand1 - operand2,
    '*': operand1 * operand2,
    '/': operand1 / operand2,
  };

  return operators[operator];
}

function render({
  operand1 = 0, operand2 = 0, operator = '', result = 0,
}) {
  function handleClickNumber(number) {
    if (operator !== '') {
      if (typeof operand2 === 'number') {
        const newOperand2 = Number(
          operand2.toString() + number.toString(),
        );

        render({
          operand1, operand2: newOperand2, operator, result: newOperand2,
        });

        return;
      }

      render({
        operand1, operand2: number, operator, result: number,
      });

      return;
    }

    if (typeof operand1 === 'number') {
      const newOperand1 = Number(
        operand1.toString() + number.toString(),
      );

      render({
        operand1: newOperand1, operand2, operator, result: newOperand1,
      });

      return;
    }

    render({
      operand1: number, operand2, operator, result: number,
    });
  }

  function handleClickOperator(currentOperator) {
    if (operator === '') {
      render({
        operand1, operand2, operator: currentOperator, result,
      });

      return;
    }

    if (currentOperator === '=') {
      const newResult = calculator(
        { operand1, operand2, operator },
      );

      render({
        operand1: 0, operand2: 0, operator: '', result: newResult,
      });

      return;
    }

    const newOperand1 = calculator(
      { operand1, operand2, operator },
    );

    render({
      operand1: newOperand1, operand2: 0, operator: currentOperator, result: newOperand1,
    });
  }

  const element = (
    <div id="calculator">
      <p>간단 계산기</p>
      <p>{result}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button
            className="number"
            type="button"
            onClick={() => handleClickNumber(i)}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button
            className="operator"
            type="button"
            onClick={() => handleClickOperator(i)}
          >
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({});
