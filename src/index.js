/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* eslint no-use-before-define: ["error", { "functions": false }] */
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

function render(firstNumber = 0, secondNumber = 0, resultNumber = 0, operation = '', state = 'calculating') {
  function clickNumber(number) {
    if (operation === '') {
      if (firstNumber !== 0) {
        render(Number(`${firstNumber}${number}`), secondNumber, Number(`${firstNumber}${number}`), operation, state);
        return;
      }
      render(firstNumber + number, 0, Number(`${secondNumber}${number}`), operation, state);
    }

    if (operation !== '' && state === 'calculating') {
      if (secondNumber !== 0) {
        render(firstNumber, Number(`${secondNumber}${number}`), Number(`${secondNumber}${number}`), operation, 'calculating');
        return;
      }
      render(firstNumber, secondNumber + number, secondNumber + number, operation, 'calculating');
    }

    if (operation !== '' && state === 'end') {
      render(firstNumber, number, number, operation, 'calculating');
    }
  }

  function clickSymbol(sign) {
    if (sign === '=') {
      if (operation === '+') {
        if (secondNumber === 0) {
          render(firstNumber + firstNumber, secondNumber, firstNumber + firstNumber, operation, 'end');
          return;
        }
        render(firstNumber + secondNumber, secondNumber, firstNumber + secondNumber, operation, 'end');
        return;
      }
      if (operation === '-') {
        if (secondNumber === 0) {
          render(firstNumber - firstNumber, secondNumber, firstNumber - firstNumber, operation, 'end');
          return;
        }
        render(firstNumber - secondNumber, secondNumber, firstNumber - secondNumber, operation, 'end');
        return;
      }
      if (operation === '*') {
        if (secondNumber === 0) {
          render(firstNumber * 0, secondNumber, firstNumber * 0, operation, 'end');
          return;
        }
        render(firstNumber * secondNumber, secondNumber, firstNumber * secondNumber, operation, 'end');
        return;
      }
      if (operation === '/') {
        if (secondNumber === 0) {
          render(firstNumber / firstNumber, secondNumber, firstNumber / firstNumber, operation, 'end');
          return;
        }
        render(firstNumber / secondNumber, secondNumber, firstNumber / secondNumber, operation, 'end');
        return;
      }
    }

    if (operation === '') {
      render(firstNumber, secondNumber, resultNumber, sign, 'calculating');
      return;
    }

    if (operation !== '') {
      render(firstNumber, secondNumber, resultNumber, sign, 'end');
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{resultNumber}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => <button type="button" onClick={() => clickNumber(number)}>{number}</button>)}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((sign) => <button type="button" onClick={() => clickSymbol(sign)}>{sign}</button>)}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
