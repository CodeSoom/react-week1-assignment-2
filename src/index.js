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

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ['+', '-', '*', '/', '='];

const calculation = {
  '': (x, y) => y,
  '=': (x, y) => y,
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

function calculate(currentOperator, accumulatedNumber, resultNumber) {
  return calculation[currentOperator]?.(accumulatedNumber, resultNumber);
}

const initial = {
  accumulatedNumber: 0,
  resultNumber: 0,
  currentOperator: '',
};

function render({ accumulatedNumber, resultNumber, currentOperator }) {
  console.log('render [calcultate] accumulatedNumber: ', accumulatedNumber);
  console.log('render [calcultate] resultNumber: ', resultNumber);
  console.log('render [calcultate] currentOperator: ', currentOperator);

  function handleNum(number) {
    console.log('number :', number);
    render({
      accumulatedNumber,
      resultNumber: resultNumber * 10 + number,
      currentOperator,
    });
  }

  function handleSum(operator) {
    // console.log('operator', operator);
    const result = calculate(currentOperator, accumulatedNumber, resultNumber);
    console.log('result :', result);

    render({
      accumulatedNumber: result,
      resultNumber: 0,
      currentOperator: operator,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{accumulatedNumber || resultNumber}</p>
      <div>
        {numbers.map((i) => (
          <button type="button" onClick={() => handleNum(i)}>
            {i}
          </button>
        ))}
      </div>
      <div>
        {operators.map((i) => (
          <button type="button" onClick={() => handleSum(i)}>
            {i}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initial);
