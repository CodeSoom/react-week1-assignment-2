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


const numberArry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operatorArry = ['+', '-', '*', '/', '='];

function handleCalculator(value, windowNumber, numOrOperator) {
  // https://stackoverflow.com/questions/20169217/how-to-write-isnumber-in-javascript
  // _isNumber

  if (numOrOperator === '=') {

  }

  if (numberArry.includes(numOrOperator)) {
    render(value + numOrOperator, windowNumber.toString() + numOrOperator.toString());
  }

  if (operatorArry.includes(numOrOperator)) {
    render(value + numOrOperator, windowNumber);
  }
}

// value = 사칙연산이 들어간 문자열
function render(value = '', windowNumber = 0) {
  console.log(value);
  const element = (
    <div id="calculator">
      <p>간단 계산기</p>
      <p>
        {windowNumber}
      </p>
      <p>
        {numberArry.map(i => (
          <button onClick={() => handleCalculator(value, windowNumber, i)}>{i}</button>
        ))}
      </p>
      <p>
        {operatorArry.map(i => (
          <button onClick={() => handleCalculator(value, windowNumber, i)}>{i}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
