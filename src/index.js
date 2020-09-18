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

function render(displayedNumber = 0, currentNumber, previousNumber, storedOperator) {
  const calculateNumbers = () => {
    const [x, operator, y] = [previousNumber, storedOperator, displayedNumber];
    const result = {
      '+': x + y,
      '-': x - y,
      '*': x * y,
      '/': x / y,
    };
    return result[operator];
  };

  const handleClickNumber = (number) => {
    if (!currentNumber) {
      render(number, number, previousNumber, storedOperator);
    } else {
      const combinedNumber = Number(currentNumber + number.toString());
      render(combinedNumber, combinedNumber, previousNumber, storedOperator);
    }
  };

  const handleClickOperator = (operator) => {
    if (currentNumber && !storedOperator) {
      render(displayedNumber, 0, currentNumber, operator);
    } else {
      render(calculateNumbers(), 0, calculateNumbers(), operator);
    }
  };

  const handleClickResult = () => {
    const result = currentNumber !== 0 ? calculateNumbers() : 0;
    render(result, 0, 0, '');
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

render();
