/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension */
/* eslint-disable no-new-func, no-use-before-define, no-unused-vars */
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

const calculate = (expression) => new Function(`return (${expression})`)();

const handleClickedNumber = (data, number) => {
  const displayNumber = (operatorList.includes(data.expression.slice(-1))) ? number : data.displayNumber * 10 + number;
  const expression = data.expression.concat((operatorList.includes(data.expression.slice(-1))) ? displayNumber : number);

  render({
    displayNumber,
    expression,
  });
};

const handleClickedOpertor = (data, operator) => {
  const { displayNumber } = data;
  const numbers = data.expression.replace(/[^0-9]/g, ' ').split(' ');
  const expression = data.expression.concat(operator);

  if (Object.keys(numbers).length < 2) render({ displayNumber, expression });
  else {
    const result = calculate(expression.slice(0, -1));
    render({
      displayNumber: result,
      expression: operator === '=' ? '' : `${String(result) + operator}`,
    });
  }
};

const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operatorList = ['+', '-', '*', '/', '='];
const initialData = {
  displayNumber: 0,
  expression: '',
};

function render(data = initialData) {
  const { displayNumber } = data;
  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="result">{displayNumber}</p>
      <p id="btn-Number">
        {numberList.map(
          (number) => (
            <button
              type="button"
              onClick={() => {
                handleClickedNumber(data, number);
              }}
            >
              {number}
            </button>
          ),
        )}
      </p>
      <p id="btn-operator">
        {operatorList.map((operator) => (
          <button
            type="button"
            onClick={() => handleClickedOpertor(data, operator)}
          >
            {operator}
          </button>
        ))}
      </p>
    </div>
  );
  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}
render();
