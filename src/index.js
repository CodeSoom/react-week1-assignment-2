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
  console.log(data);

  const { operandA, expression } = data;

  const showNumber = (operatorList.includes(expression.slice(-1))) ? number : operandA * 10 + number;
  const expressions = (operatorList.includes(expression.slice(-1))) ? expression.concat(showNumber) : expression.concat(number);

  render({
    operandA: showNumber,
    operandB: undefined,
    expression: expressions,
  });
};

const handleClickedOpertor = (data, operator) => {
  const { operandA, operandB } = data;
  const numbers = data.expression.replace(/[^0-9]/g, ' ').split(' ');
  const expression = data.expression.concat(operator);
  if (Object.keys(numbers).length < 2) render({ operandA, operandB: operandA, expression });
  else {
    const result = calculate(expression.slice(0, -1));
    render({
      operandA: result,
      operandB: 0,
      expression: (operator === '=') ? '' : String(result),
    });
  }
};

const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operatorList = ['+', '-', '*', '/', '='];
const initialData = {
  operandA: 0,
  operandB: 0,
  expression: '',
};

function render(data = initialData) {
  const { operandA, operandB } = data;
  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="result">{operandA || operandB}</p>
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
