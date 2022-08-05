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

function render(firstNumber = 0, secondNumber = 0, resultNumber = 0, operation = '') {
  function clickNumber(number) {
    if (firstNumber === 0 && operation === '') {
      render(firstNumber + number, secondNumber, resultNumber + number, operation);
    }

    if (firstNumber !== 0 && operation === '') {
      render(Number(`${firstNumber}${number}`), secondNumber, Number(`${resultNumber}${number}`), operation);
    }

    if (firstNumber !== 0 && operation !== '' && secondNumber === 0) {
      render(firstNumber, secondNumber + number, number, operation);
    }

    if (firstNumber !== 0 && operation !== '' && secondNumber !== 0) {
      render(firstNumber, Number(`${secondNumber}${number}`), Number(`${secondNumber}${number}`), operation);
    }
  }

  function clickSymbol(sign) {
    if (firstNumber && secondNumber && sign === '=') {
      if (operation === '+') {
        render(0, 0, firstNumber + secondNumber, '');
        return;
      }
    }
    render(firstNumber, secondNumber, resultNumber, sign);
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
