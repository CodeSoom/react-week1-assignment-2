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

function plus(x, y) {
  return x + y;
}

function minus(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}


function render(
  previousNumber = null,
  operator = null,
  afterNumber = null,
  resultNumber = 0,
) {
  function handleClickNumber(number) {
    const nextNumber = (afterNumber === null ? 0 : (resultNumber * 10)) + number;
    render(previousNumber, operator, nextNumber, nextNumber);
  }

  function handleClickOperator(inputOperator) {
    if (inputOperator === '=') {
      render(null, null, null, operator(previousNumber, afterNumber));
      return;
    }

    if (previousNumber === null) {
      render(afterNumber, inputOperator, null, resultNumber);
      return;
    }

    if (afterNumber === null) {
      render(previousNumber, inputOperator, null, resultNumber);
      return;
    }

    render(operator(previousNumber, afterNumber), inputOperator,
      null, operator(previousNumber, afterNumber));
  }

  const calculationFunctions = [plus, minus, multiply, divide, '='];

  const element = (
    <div>
      <p>간단 계산기</p>
      {resultNumber}
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>

      <p>
        {['+', '-', '*', '/', '='].map((i, index) => (
          <button type="button" onClick={() => handleClickOperator(calculationFunctions[index])}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
