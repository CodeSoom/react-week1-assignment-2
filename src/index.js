/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

var operations = {
  "+": function (operand1, operand2) {
    return operand1 + operand2;
  },
  "-": function (operand1, operand2) {
    return operand1 - operand2;
  },
  "*": function (operand1, operand2) {
    return operand1 * operand2;
  },
  "/": function (operand1, operand2) {
    return operand1 / operand2;
  }
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

const handleClickCalc = (currentNumber, preNumber, operator, preOperator) => {
  if (preNumber === undefined) {
    render(currentNumber, currentNumber, operator, true);
    return;
  }

  if (operator === "=") {
    render(accumulate([preNumber, currentNumber], preOperator), undefined, undefined, true);
    return;
  }

  render(accumulate([preNumber, currentNumber], preOperator), accumulate([preNumber, currentNumber], preOperator), operator, true);
};

function render(currentNumber, preNumber, preOperator, isOperated) {
  const handleClickNumber = (clickedNumber) => {
    if (isOperated) {
      render(clickedNumber, preNumber, preOperator, false);
      return;
    }
    render(
      currentNumber * 10 + clickedNumber,
      preNumber,
      preOperator,
      isOperated
    );
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
        {["+", "-", "*", "/", "="].map((operator) => (
          <button
            type="button"
            onClick={() =>
              handleClickCalc(currentNumber, preNumber, operator, preOperator)
            }
          >
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById("app").textContent = "";
  document.getElementById("app").appendChild(element);
}

render(0, undefined, undefined, false);
