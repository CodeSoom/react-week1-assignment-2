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

const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operatorsArray = ['+', '-', '*', '/', '='];

function render({
  numberInput = 0,
  displayNumber = 0,
  storedOperator = '',
  storedNumber = 0,
}) {
  const calculateFunctions = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };

  function defaultCalcFunction(x, y) {
    return x || y;
  }
  function calculate(operator) {
    return (calculateFunctions[operator] || defaultCalcFunction)(storedNumber, numberInput);
  }

  function handleNumberClick(number) {
    if (numberInput === 0) {
      render({
        numberInput: number,
        displayNumber: number,
        storedOperator,
        storedNumber,
      });
    }
    // handle multiple digits input
    const processedNumber = Number(String(numberInput) + String(number));
    render({
      numberInput: processedNumber,
      displayNumber: processedNumber,
      storedOperator,
      storedNumber,
    });
  }

  function handleOperatorClick(operator) {
    const calculatedValue = calculate(storedOperator);
    // when the calculation is fully completed with '=' operator
    if (operator === '=' && storedOperator !== '') {
      render({
        numberInput: 0,
        displayNumber: calculatedValue,
        storedOperator: '',
        storedNumber: 0,
      });
      return;
    }
    // show the current number when there is no prev operator
    if (operator === '=' && storedOperator === '') {
      render({
        numberInput: 0,
        displayNumber: numberInput,
        storedOperator: '',
        storedNumber: 0,
      });
      return;
    }
    // when the operation is happening for the first time
    if (storedOperator === '') {
      render({
        numberInput: 0,
        displayNumber,
        storedOperator: operator,
        storedNumber: displayNumber,
      });
      return;
    }
    // when there was previous operation that needs to be completed
    // before this calculation
    render({
      numberInput: 0,
      displayNumber: calculatedValue,
      storedOperator: operator,
      storedNumber: calculatedValue,
    });
  }

  function renderButtons(array, type) {
    return array.map((i) => (
      <button
        type="button"
        onClick={() => {
          switch (type) {
          case 'numbers':
            handleNumberClick(i);
            return null;
          case 'operators':
            handleOperatorClick(i);
            return null;
          default:
            return null;
          }
        }}
      >
        {i}
      </button>
    ));
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayNumber}</p>
      <p>{renderButtons(numbersArray, 'numbers')}</p>
      <p>{renderButtons(operatorsArray, 'operators')}</p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({});
