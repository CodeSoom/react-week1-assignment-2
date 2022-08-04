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

// calculateParameter [ calculatedNumber, operator, currentNumber ]
function render(...calculateParameter) {
  function calculator(calculatedNumber, operator, currentNumber) {
    if (operator === '+') return calculatedNumber + currentNumber;
    if (operator === '-') return calculatedNumber - currentNumber;
    if (operator === '*') return calculatedNumber * currentNumber;
    if (operator === '/') return calculatedNumber / currentNumber;
    return currentNumber; // '='
  }

  function isExistCurrentNumber(currentNumber) {
    return currentNumber !== null;
  }

  function addNumber(clickedNumber, currentNumber) {
    return isExistCurrentNumber(currentNumber) ? Number(`${currentNumber}${clickedNumber}`) : clickedNumber;
  }

  function clickNumber(clickedNumber, calculatedNumber, operator, currentNumber) {
    const calculatedCurrentNumber = addNumber(clickedNumber, currentNumber);
    return render(calculatedNumber, operator, calculatedCurrentNumber);
  }

  function getCalculateNumber(previousCalculatedNumber, operator, currentNumber) {
    return (isExistCurrentNumber(currentNumber)
      ? calculator(previousCalculatedNumber, operator, currentNumber) : previousCalculatedNumber);
  }

  function clickOperator(operatorString, previousCalculatedNumber, operator, currentNumber) {
    const calculateNumber = getCalculateNumber(previousCalculatedNumber, operator, currentNumber);
    return render(calculateNumber, operatorString, null);
  }

  function settingShowNumber(calculatedNumber, currentNumber) {
    return isExistCurrentNumber(currentNumber) ? currentNumber : calculatedNumber;
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{settingShowNumber(calculateParameter[0], calculateParameter[2])}</p>
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
