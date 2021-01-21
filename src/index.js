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

function handleNewInput(presentNumber, previousNumber = '0', carrier = 0) {
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
  const operatorFunctions = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };

  return operatorFunctions[sign](previousNumber, presentNumber);
}

function render(
  presentNumber = '0',
  previousNumber = 'X',
  presentSign = 0,
  carrier = 0,
) {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const signs = ['+', '-', '*', '/', '='];

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{presentNumber}</p>
      <p>
        {digits.map((digit) => (
          <button
            type="button"
            onClick={() => {
              if (previousNumber === 'X' && handleNewInput(presentNumber, previousNumber, carrier)) {
                render(digit, previousNumber, presentSign);
                return;
              }
              if (handleNewInput(presentNumber, previousNumber, carrier)) {
                render(digit, previousNumber, presentSign);
                return;
              }
              render(
                handleBigNumber(presentNumber, digit),
                previousNumber,
                presentSign,
              );
            }}
          >
            {digit}
          </button>
        ))}
      </p>
      <p>
        {signs.map((sign) => (
          <button
            type="button"
            onClick={() => {
              if (presentSign === '=') {
                render(presentNumber, presentNumber, sign);
                return;
              }
              if (presentSign !== 0 && previousNumber !== 'X') {
                render(
                  calculate(previousNumber, presentNumber, presentSign),
                  calculate(previousNumber, presentNumber, presentSign),
                  sign,
                  carrier + 1,
                );
                return;
              }
              render(presentNumber, presentNumber, sign);
            }}
          >
            {sign}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
