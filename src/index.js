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

const numbersArr = [...Array(9)].map((_, index) => index + 1).concat(0);
const operatorsArr = ['+', '-', '*', '/', '='];

function calculateTwoNumbers([firstNumber, operation, secondNumber]) {
  if (operation === '+') {
    return firstNumber + secondNumber;
  }
  if (operation === '-') {
    return firstNumber - secondNumber;
  }
  if (operation === '*') {
    return firstNumber * secondNumber;
  }
  if (operation === '/') {
    return firstNumber / secondNumber;
  }

  return 0;
}

function render({ number, operationAndNumberArr, isNewNumber }) {
  const handleInputValue = ({ value }) => {
    render({
      operationAndNumberArr,
      number: isNewNumber ? Number(value) : Number(String(number) + value),
      isNewNumber: isNewNumber && false,
    });
  };

  const handleCalculation = ({ value }) => {
    const MINIMUM_LENGTH_OF_ARRAYS_FOR_CALCULATION = 2;

    const newOperationAndNumberArr = operationAndNumberArr.concat(number, value);

    if (newOperationAndNumberArr.length > MINIMUM_LENGTH_OF_ARRAYS_FOR_CALCULATION) {
      newOperationAndNumberArr.unshift(calculateTwoNumbers(newOperationAndNumberArr.splice(0, 3)));
    }

    render({
      operationAndNumberArr: newOperationAndNumberArr,
      number: newOperationAndNumberArr[0],
      isNewNumber: true,
    });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number}</p>
      <p>
        {numbersArr.map((value) => (
          <button
            type="button"
            onClick={() => handleInputValue({ value })}
          >
            {value}
          </button>
        ))}
      </p>
      <p>
        {operatorsArr.map((value) => (
          <button
            type="button"
            onClick={() => handleCalculation({ value })}
          >
            {value}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  number: 0,
  operationAndNumberArr: [],
  isNewNumber: false,
});
