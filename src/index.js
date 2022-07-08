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

function render({
  operand1 = 0, operand2 = 0, operator = '', result = 0,
}) {
  const calculatorElements = {
    operand1,
    operand2,
    operator,
    result,
  };

  function calculator() {
    const operators = {
      '+': operand1 + operand2,
      '-': operand1 - operand2,
      '*': operand1 * operand2,
      '/': operand1 / operand2,
    };

    return operators[operator];
  }

  function handleClickNumber(number) {
    const temp = { ...calculatorElements };
    if (operator !== '') {
      if (typeof operand2 === 'number') {
        temp.operand2 = Number(
          operand2.toString() + number.toString(),
        );
        temp.result = temp.operand2;

        render(temp);
        return;
      }
      temp.operand2 = number;
      temp.result = temp.operand2;

      render(temp);
      return;
    }

    if (typeof operand1 === 'number') {
      temp.operand1 = Number(
        operand1.toString() + number.toString(),
      );
      temp.result = temp.operand1;

      render(temp);
      return;
    }
    temp.operand1 = number;
    temp.result = temp.operand1;

    render(temp);
  }

  function handleClickOperator(currentOperator) {
    const temp = { ...calculatorElements };
    if (operator === '') {
      temp.operator = currentOperator;
      render(temp);
      return;
    }

    if (currentOperator === '=') {
      temp.operand1 = 0;
      temp.operand2 = 0;
      temp.operator = '';
      temp.result = calculator();

      render(temp);
      return;
    }
    temp.operand1 = calculator();
    temp.operand2 = 0;
    temp.operator = currentOperator;
    temp.result = calculator();

    render(temp);
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
