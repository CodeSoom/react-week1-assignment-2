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

const initState = {
  count: 0,
  previousNumber: 0,
  previousOperator: '',
};

function render({
  count = 0, previousNumber = 0, previousOperator = '',
}) {
  function calculate(number1, number2, operator) {
    const operators = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
    };
    return operators[operator]?.(number1, number2);
  }

  function handleClickDigit(digit) {
    // If input number exceeds 9007199254740991, reset the calculator.
    if (count > Number.MAX_SAFE_INTEGER) {
      render(initState);
      return;
    }

    if ((previousNumber !== count || typeof count === 'string') && count !== 0) {
      render({
        count: count.toString() + digit.toString(), previousNumber, previousOperator,
      });
      return;
    }

    render({
      count: digit, previousNumber, previousOperator,
    });
  }

  function handleClickOperator(operator) {
    const result = calculate(Number(previousNumber), Number(count), previousOperator);
    if (operator === '=') {
      render({
        count: result, previousNumber: 0, previousOperator,
      });
      return;
    }

    if (previousOperator) {
      render({
        count: result, previousNumber: result, previousOperator: operator,
      });
    }

    previousOperator = operator;
    previousNumber = count;
    count = 0;
  }

  const element = (
    <div>
      <p>간단 계산기</p>

      <p>
        {count}
      </p>

      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickDigit(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button type="button" onClick={() => handleClickOperator(i)}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initState);
