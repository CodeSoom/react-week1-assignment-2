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

const collectedNumber = {
  numberList: [],
  numberJoinList: [],
};

function render({ displayNumber }) {
  const { numberJoinList, numberList } = collectedNumber;
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];

  const calculate = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };

  const displayNumberController = () => (numberList.length > 1
    ? render({ displayNumber: numberList.join('') })
    : render({ displayNumber: numberList[0] }));

  const handleClickNumber = (number) => {
    numberList.push(number);
    displayNumberController(numberList);
  };

  const handleResult = ([prevNumber, operator, nextNumber], nextOperator) => {
    if (numberJoinList.length >= 3) {
      const value = calculate[operator](prevNumber, nextNumber);
      render({ displayNumber: value });
      collectedNumber.numberJoinList = [value, nextOperator];
    }

    if (nextOperator === '=') {
      const value = calculate[operator](prevNumber, nextNumber);
      render({ displayNumber: value });
      numberJoinList.splice(0);
    }
  };

  const handleClickOperator = (operator) => {
    numberJoinList.push(Number(numberList.join('')));
    numberList.splice(0);
    numberJoinList.push(operator);
    handleResult(numberJoinList, operator);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <span>{displayNumber}</span>
      <hr />
      <div className="button_number_collection">
        {numbers.map((number) => (
          <button type="button" onClick={() => handleClickNumber(number)}>
            {number}
          </button>
        ))}
      </div>
      <br />
      <div className="button_operator_collection">
        {operators.map((operator) => (
          <button type="button" onClick={() => handleClickOperator(operator)}>
            {operator}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ displayNumber: 0 });
