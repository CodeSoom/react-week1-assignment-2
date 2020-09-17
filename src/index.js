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
  currentNumber = 0,
  storedNumber = null,
  storedOperator = null,
  isNewNumber = false,
}) {
  const clickNumberHandler = (number) => {
    if (isNewNumber) {
      render({
        currentNumber: number,
        storedNumber,
        storedOperator,
        isNewNumber: false,
      });
      return;
    }
    render({
      currentNumber: currentNumber * 10 + number,
      storedNumber,
      storedOperator,
      isNewNumber: false,
    });
  };

  const clickOperatorHandler = (operator) => {
    if (operator === '=' && storedOperator === '+') {
      render({
        currentNumber: currentNumber + storedNumber,
        storeNumber: null,
        storedOperator: null,
        isNewNumber: true,
      });
      return;
    }
    render({
      currentNumber,
      storedNumber: currentNumber,
      storedOperator: operator,
      isNewNumber: true,
    });
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

render({});
