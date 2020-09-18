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

function calculate(firstNumber, secondNumber, operator) {
  const map = {
    '+': firstNumber + secondNumber,
  };

  return map[operator];
}

function updateCurrentNumber(message, clickedNumber, currentNumber, storedNumber, storedOperator) {
  const map = {
    NEW: clickedNumber,
    ADD: currentNumber * 10 + clickedNumber,
    RESULT: calculate(currentNumber, storedNumber, storedOperator),
    STORE: currentNumber,
  };

  return map[message];
}

function updateStoredNumber(message, currentNumber) {
  const map = {
    RESULT: null,
    STORE: currentNumber,
  };

  return map[message];
}

function updateStoredOperator(message, clickedOperator) {
  const map = {
    RESULT: null,
    STORE: clickedOperator,
  };

  return map[message];
}

function render({
  currentNumber = 0,
  storedNumber = null,
  storedOperator = null,
  isNewNumber = false,
}) {
  const handleClickNumber = (number) => {
    const createMessage = () => (isNewNumber ? 'NEW' : 'ADD');

    render({
      currentNumber: updateCurrentNumber(createMessage(), number, currentNumber),
      storedNumber,
      storedOperator,
      isNewNumber: false,
    });
  };

  const handleClickOperator = (operator) => {
    const createMessage = () => ((operator === '=') ? 'RESULT' : 'STORE');

    render({
      currentNumber: updateCurrentNumber(
        createMessage(),
        null,
        currentNumber,
        storedNumber,
        storedOperator,
      ),
      storedNumber: updateStoredNumber(createMessage(), currentNumber),
      storedOperator: updateStoredOperator(createMessage(), operator),
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
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '='].map((operator) => (
          <button type="button" onClick={() => handleClickOperator(operator)}>
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
