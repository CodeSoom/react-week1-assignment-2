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

const operatorList = {
  '+': (a, b) => Number(a) + Number(b),
  '-': (a, b) => Number(a) - Number(b),
  '*': (a, b) => Number(a) * Number(b),
  '/': (a, b) => Number(a) / Number(b),
};

function input(presentNumber, carrier, presentSign, previousNumber) {
  return {
    presentNumber,
    carrier,
    presentSign,
    previousNumber,
  };
}
function numberClick(presentNumber, carrier, presentSign, previousNumber) {
  const result = [carrier, presentNumber].join('');
  return input(result, result, presentSign, previousNumber);
}

function operatorClick(presentSign, carrier, previousSign, previousNumber) {
  if (!previousSign) return input(carrier, '', presentSign, carrier);
  const result = operatorList[previousSign](Number(previousNumber), Number(carrier));
  return input(result, '', presentSign, result);
}

function render({
  presentNumber,
  carrier,
  presentSign,
  previousNumber,
}) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{presentNumber}</p>
      {numbers.map((num) => (<button type="button" onClick={() => render(numberClick(num, carrier, presentSign, previousNumber))}>{num}</button>))}
      <br />
      {operators.map((operator) => (<button type="button" onClick={() => render(operatorClick(operator, carrier, presentSign, previousNumber))}>{operator}</button>))}
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  presentNumber: 0,
  carrier: '',
  presentSign: null,
  previousNumber: null,
});
