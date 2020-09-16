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

function render(
  previousNumber = null,
  operator = null,
  afterNumber = 0,
  resultNumber = 0,
) {
  function calculate() {
    if (operator === '+') {
      return previousNumber + afterNumber;
    }
    if (operator === '-') {
      return previousNumber - afterNumber;
    }
    if (operator === '*') {
      return previousNumber * afterNumber;
    }
    return previousNumber / afterNumber;
  }

  function handleClickNumber(inputNumber) {
    if (afterNumber !== 0) {
      render(
        previousNumber,
        operator,
        resultNumber + String(inputNumber),
        resultNumber + String(inputNumber),
      );
      return;
    }
    render(previousNumber, operator, inputNumber, inputNumber);
  }

  function handleClickOperator(inputOperator) {
    if (inputOperator === '=') {
      render(0, null, 0, calculate());
      return;
    }

    if (previousNumber !== null) {
      if (operator !== null) {
        render(calculate(), inputOperator, 0, calculate());
        return;
      }
      render(calculate(), inputOperator, 0, resultNumber);
    }

    render(afterNumber, inputOperator, 0, resultNumber);
  }

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
        {['+', '-', '*', '/', '='].map((o) => (
          <button type="button" onClick={() => handleClickOperator(o)}>
            {o}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
