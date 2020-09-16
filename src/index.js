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

function render(currentNumber = 0, previousNumber, currentOperator) {
  let chosenOperator;

  const operationEnds = currentOperator === '=';

  const clickNumberHandler = (number) => {
    if (chosenOperator) {
      render(number, currentNumber, chosenOperator);
      return;
    }
    if (operationEnds) {
      render(number);
      return;
    }
    render(currentNumber * 10 + number, previousNumber, currentOperator);
  };

  const clickOperatorHandler = (operator) => {
    if (operator === '=' && currentOperator === '+') {
      render(currentNumber + previousNumber, null, '=');
      return;
    }
    chosenOperator = operator;
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {currentNumber}
      </p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => clickNumberHandler(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '='].map((operator) => (
          <button type="button" onClick={() => clickOperatorHandler(operator)}>
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
