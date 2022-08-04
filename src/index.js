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

function render(...calculateParameter) {
  function calculator(calculatedValue, operator, currentNumber) {
    if (operator === '+') return calculatedValue + currentNumber;
    if (operator === '-') return calculatedValue - currentNumber;
    if (operator === '*') return calculatedValue * currentNumber;
    if (operator === '/') return calculatedValue / currentNumber;
    return currentNumber; // '='
  }

  function isExistCurrentNumber(currentNumber) {
    return currentNumber !== null;
  }

  function clickNumber(clickedNumber, calculatedValue, operator, currentNumber) {
    const calculatedCurrentNumber = isExistCurrentNumber(currentNumber) ? Number(`${currentNumber}${clickedNumber}`) : clickedNumber;
    return render(calculatedValue, operator, calculatedCurrentNumber);
  }

  function clickOperator(operatorString, calculatedValue, operator, currentNumber) {
    const selectOperator = (isExistCurrentNumber(currentNumber)
      ? calculator(calculatedValue, operator, currentNumber) : calculatedValue);
    return render(selectOperator, operatorString, null);
  }

  function settingShowNumber(calculatedValue, operator, currentNumber) {
    return isExistCurrentNumber(currentNumber) ? currentNumber : calculatedValue;
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{settingShowNumber(...calculateParameter)}</p>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => <button type="button" onClick={() => clickNumber(number, ...calculateParameter)}>{number}</button>)}
      <br />
      <br />
      {['+', '-', '*', '/', '='].map((operatorString) => <button type="button" onClick={() => clickOperator(operatorString, ...calculateParameter)}>{operatorString}</button>)}
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0, '=', 0);
