/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const operatorFunctions = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

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

function handleNewInput(presentNumber, previousNumber, carrier = 0) {
  if (presentNumber === '0') {
    return true;
  }
  if (presentNumber === previousNumber) {
    return true;
  }
  if (carrier !== 0) {
    return true;
  }

  return false;
}

function handleBigNumber(presentNumber, digit) {
  return presentNumber * 10 + digit;
}

function calculate(previousNumber, presentNumber, sign) {
  return operatorFunctions[sign](previousNumber, presentNumber);
}

function render(
  {
    presentNumber = '0',
    previousNumber = 'X',
    presentSign = 0,
    carrier = 0,
  },
) {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];

  function handleClickDigit(digit) {
    if (previousNumber === 'X' && handleNewInput(presentNumber, previousNumber, carrier)) {
      render({ presentNumber: digit, previousNumber, presentSign });
      return;
    }
    if (handleNewInput(presentNumber, previousNumber, carrier)) {
      render({ presentNumber: digit, previousNumber, presentSign });
      return;
    }
    render({
      presentNumber: handleBigNumber(presentNumber, digit),
      previousNumber,
      presentSign,
    });
  }

  function handleClickOperator(oeprator) {
    if (presentSign === '=') {
      render({ presentNumber, previousNumber: presentNumber, presentSign: oeprator });
      return;
    }
    if (presentSign !== 0 && previousNumber !== 'X') {
      render({
        presentNumber: calculate(previousNumber, presentNumber, presentSign),
        previousNumber: calculate(previousNumber, presentNumber, presentSign),
        presentSign: oeprator,
        carrier: carrier + 1,
      });
      return;
    }
    render({ presentNumber, previousNumber: presentNumber, presentSign: oeprator });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{presentNumber}</p>
      <p>
        {digits.map((digit) => (
          <button
            type="button"
            onClick={() => handleClickDigit(digit)}
          >
            {digit}
          </button>
        ))}
      </p>
      <p>
        {operators.map((operator) => (
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

render({});
