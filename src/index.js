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

const initValue = {
  accumulate: 0,
  number: 0,
  operator: null,
};

const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operatorList = ['+', '-', '*', '/'];

const opertorFunctions = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y || y,
};

const calculate = (operator, accumulate, number) => opertorFunctions[operator](accumulate, number);

function render({ accumulate, number, operator }) {
  const handleClickNumber = (prevNumber, addNumber) => (
    render({
      accumulate,
      number: prevNumber * 10 + addNumber,
      operator,
    })
  );

  const handleClickOperator = (value) => {
    render({
      accumulate: calculate(operator || value, accumulate, number),
      number: 0,
      operator: value,
    });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number || accumulate}</p>
      <p>
        {numberList.map((item) => (
          <button type="button" onClick={() => { handleClickNumber(number, item); }}>{item}</button>
        ))}
      </p>
      <p>
        {operatorList.map((item) => (
          <button type="button" onClick={() => { handleClickOperator(item); }}>{item}</button>
        ))}
        <button type="button" onClick={() => { handleClickOperator(); }}>=</button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initValue);
