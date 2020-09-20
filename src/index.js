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

function calculateNumbers(x, operator, y) {
  const operators = {
    '+': x + y,
    '-': x - y,
    '*': x * y,
    '/': x / y,
  };

  return operators[operator];
}

function render({ displayedNumber, currentNumber, calculateContent }) {
  const handleClickNumber = (number) => {
    const combinedNumber = (currentNumber ?? 0) * 10 + number;
    render({
      displayedNumber: combinedNumber,
      currentNumber: combinedNumber,
      calculateContent,
    });
  };

  const handleClickOperator = (operator) => {
    const getDisplayedNumber = !currentNumber || !calculateContent
      ? displayedNumber
      : calculateNumbers(calculateContent.previousNumber, calculateContent.operator, currentNumber);
    render({
      displayedNumber: getDisplayedNumber,
      currentNumber: 0,
      calculateContent: {
        previousNumber: getDisplayedNumber,
        operator,
      },
    });
  };

  const handleClickResult = () => {
    const result = currentNumber
      ? calculateNumbers(calculateContent.previousNumber, calculateContent.operator, currentNumber)
      : 0;
    render({
      displayedNumber: result,
      currentNumber: 0,
      calculateContent,
    });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayedNumber}</p>
      <div>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
            <button
              type="button"
              onClick={() => handleClickNumber(i)}
            >
              {i}
            </button>
          ))
        }
      </div>
      <div>
        {['+', '-', '*', '/'].map((i) => (
          <button
            type="button"
            onClick={() => handleClickOperator(i)}
          >
            {i}
          </button>
        ))}
        <button
          type="button"
          onClick={handleClickResult}
        >
          =
        </button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  displayedNumber: 0,
  currentNumber: 0,
  calculateContent: null,
});
