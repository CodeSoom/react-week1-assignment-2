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
  afterNumber = null,
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
    if (afterNumber === null) {
      render(previousNumber, operator, inputNumber, inputNumber);
      return;
    }
    render(
      previousNumber,
      operator,
      (resultNumber * 10) + inputNumber,
      (resultNumber * 10) + inputNumber,
    );
  }

  function handleClickOperator(inputOperator) {
    if (inputOperator === '=') {
      render(null, null, null, calculate());
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

    render(calculate(), inputOperator, null, calculate());
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
