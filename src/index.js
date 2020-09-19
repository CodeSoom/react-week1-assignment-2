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

const numberJoinList = [];

function render({ displayNumber }) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/'];

  const calculate = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };

  function handleClickNumber(number) {
    const newDisplayNumber = (displayNumber * 10) + number;
    render({ displayNumber: newDisplayNumber });
  }

  const calculator = ([prevNumber, operator, nextNumber], nextOperator) => {
    const value = calculate[operator](prevNumber, nextNumber);
    render({ displayNumber: numberJoinList[0] });
    numberJoinList.splice(0);
    numberJoinList.push(value, nextOperator);
  };

  const handleClickEqual = ([prevNumber, operator, nextNumber]) => {
    const value = calculate[operator](prevNumber, nextNumber);
    render({ displayNumber: value });
    numberJoinList.splice(0);
  };

  const saveValue = (operator) => {
    numberJoinList.push(displayNumber, operator);
    return numberJoinList;
  };

  const waitNextNumber = () => {
    if (numberJoinList.length < 3) return 0;
  };

  const handleClickOperator = (operator) => {
    numberJoinList.push(displayNumber, operator, waitNextNumber());
    calculator(saveValue(operator), operator);
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
        <button type="button" onClick={() => handleClickEqual(numberJoinList)}>=</button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ displayNumber: 0 });
