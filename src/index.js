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

function calculateNumbers({ x, operator, y }) {
  const operators = {
    '+': x + y,
    '-': x - y,
    '*': x * y,
    '/': x / y,
  };

  return operators[operator];
}

function render({ displayedNumber, calculateContent }) {
  const handleClickNumber = (number) => {
    const combinedNumber = (calculateContent.currentNumber ?? 0) * 10 + number;
    render({
      displayedNumber: combinedNumber,
      calculateContent: {
        currentNumber: combinedNumber,
        previousNumber: calculateContent.previousNumber,
        storedOperator: calculateContent.storedOperator,
      },
    });
  };

  const handleClickOperator = (operator) => {
    const getDisplayedNumber = calculateContent.currentNumber && calculateContent.storedOperator
      ? calculateNumbers({
        x: calculateContent.previousNumber,
        y: calculateContent.currentNumber,
        operator: calculateContent.storedOperator,
      })
      : displayedNumber;
    render({
      displayedNumber: getDisplayedNumber,
      calculateContent: {
        currentNumber: 0,
        previousNumber: getDisplayedNumber,
        storedOperator: operator,
      },
    });
  };

  const handleClickResult = () => {
    const result = calculateContent.currentNumber && calculateContent.previousNumber
      ? calculateNumbers({
        x: calculateContent.previousNumber,
        y: calculateContent.currentNumber,
        operator: calculateContent.storedOperator,
      })
      : 0;
    render({
      displayedNumber: result,
      calculateContent: {
        currentNumber: 0,
        previousNumber: 0,
        storedOperator: '',
      },
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
  calculateContent: {
    currentNumber: 0,
  },
});
