/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const operations = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

function accumulate(list, operator) {
  return list.reduce(operations[operator]);
}

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

/*
const handleClickOperator = ({
  number, preNumber, operator, preOperator,
}) => {
  if (preNumber === undefined) {
    render({
      currentNumber: number,
      preNumber: number,
      operator,
      isOperated: true,
    });
    return;
  }

  if (operator === '=') {
    render({
      currentNumber: accumulate([preNumber, number], preOperator),
      preNumber: undefined,
      operator: undefined,
      isOperated: true,
    });
    return;
  }

  render({
    currentNumber: accumulate([preNumber, number], preOperator),
    preNumber: accumulate([preNumber, number], preOperator),
    operator,
    isOperated: true,
  });
};
*/

function render({
  currentNumber, preNumber, preOperator, isOperated,
}) {
  console.log(currentNumber, preNumber, preOperator, isOperated);
  const handleClickNumber = (number) => {
    if (isOperated) {
      render({
        currentNumber: number, preNumber, preOperator, isOperated: false,
      });
      return;
    }

    render({
      currentNumber: currentNumber * 10 + number,
      preNumber,
      preOperator,
      isOperated,
    });
  };

  const handleClickOperator = (operator) => {
    if (preNumber === undefined) {
      render({
        currentNumber,
        preNumber: currentNumber,
        preOperator: operator,
        isOperated: true,
      });

      return;
    }

    if (operator === '=') {
      render({
        currentNumber: accumulate([preNumber, currentNumber], preOperator),
        preNumber: undefined,
        operator: undefined,
        isOperated: true,
      });

      return;
    }

    render({
      currentNumber: accumulate([preNumber, currentNumber], preOperator),
      preNumber: accumulate([preNumber, currentNumber], preOperator),
      preOperator: operator,
      isOperated: true,
    });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{currentNumber}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((operator) => (
          <button
            type="button"
            onClick={() => handleClickOperator(operator)}
          >
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  currentNumber: 0, preNumber: undefined, operator: undefined, isOperated: false,
});
