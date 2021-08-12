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

const currentValues = {
  leftNumber: 0,
  rightNumber: 0,
  operator: null,
  result: 0,
};

function render(value = 0) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = [
    { pattern: '+', calcuate: (x, y) => x + y },
    { pattern: '-', calcuate: (x, y) => x - y },
    { pattern: '*', calcuate: (x, y) => x * y },
    { pattern: '/', calcuate: (x, y) => x / y },
  ];

  function operate(operator) {
    if (operator === '+') {
      currentValues.result = currentValues.leftNumber + currentValues.rightNumber;
    } else if (operator === '-') {
      currentValues.result = currentValues.leftNumber - currentValues.rightNumber;
    } else if (operator === '*') {
      currentValues.result = currentValues.leftNumber * currentValues.rightNumber;
    } else if (operator === '/') {
      currentValues.result = currentValues.leftNumber / currentValues.rightNumber;
    } else if (operator === '=') {
      if (currentValues.operator === '+') {
        currentValues.result = currentValues.leftNumber + currentValues.rightNumber;
      } else if (currentValues.operator === '-') {
        currentValues.result = currentValues.leftNumber - currentValues.rightNumber;
      } else if (currentValues.operator === '*') {
        currentValues.result = currentValues.leftNumber * currentValues.rightNumber;
      } else if (currentValues.operator === '/') {
        currentValues.result = currentValues.leftNumber / currentValues.rightNumber;
      }
    }
  }

  function handleClickNumber(number) {
    if (currentValues.operator === null) {
      currentValues.leftNumber = currentValues.leftNumber * 10 + number;
      render(currentValues.leftNumber);
      // console.log(currentValues);
    } else {
      currentValues.rightNumber = currentValues.rightNumber * 10 + number;
      render(currentValues.rightNumber);
      // console.log(currentValues);
    }
  }

  function handleClickOperator(operator) {
    if (operator === '=') {
      operate(operator);
      render(currentValues.result);
      // console.log(currentValues);
      currentValues.leftNumber = 0;
      currentValues.rightNumber = 0;
      currentValues.operator = null;
      currentValues.result = 0;
      // console.log(currentValues);
    // eslint-disable-next-line brace-style
    }

    // 연속해서 연산하는 경우
    else if (operator !== '=' && currentValues.operator) {
      operate(currentValues.operator);
      currentValues.operator = operator;
      currentValues.leftNumber = currentValues.result;
      currentValues.rightNumber = 0;
      render(currentValues.result);
      // console.log(currentValues);
    } else if (operator !== '=') {
      currentValues.operator = operator;
      // console.log(currentValues);
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {value}
      </p>
      <p>
        {numbers.map((number) => (
          <button type="button" onClick={() => handleClickNumber(number)}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {operators.map((operator) => (
          <button type="button" onClick={() => handleClickOperator(operator)}>
            {operator.pattern}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
