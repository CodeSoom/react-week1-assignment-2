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

function render(calculatedValue, operator, currentNumber) {
  function calculator() {
    if (operator === '+') return calculatedValue + currentNumber;
    if (operator === '-') return calculatedValue - currentNumber;
    if (operator === '*') return calculatedValue * currentNumber;
    if (operator === '/') return calculatedValue / currentNumber;
    return currentNumber; // '='
  }

  function isExistCurrentNumber() {
    return currentNumber !== null;
  }

  function clickNumber(clickedNumber) {
    const calculatedCurrentNumber = isExistCurrentNumber() ? Number(`${currentNumber}${clickedNumber}`) : clickedNumber;
    return render(calculatedValue, operator, calculatedCurrentNumber);
  }

  function clickOperator(operatorString) {
    const selectOperator = (isExistCurrentNumber() ? calculator() : calculatedValue);
    return render(selectOperator, operatorString, null);
  }

  function settingShowNumber() {
    return isExistCurrentNumber(currentNumber) ? currentNumber : calculatedValue;
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{settingShowNumber()}</p>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => <button type="button" onClick={() => clickNumber(number)}>{number}</button>)}
      <br />
      <br />
      {['+', '-', '*', '/', '='].map((operatorString) => <button type="button" onClick={() => clickOperator(operatorString)}>{operatorString}</button>)}
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0, '=', 0);
