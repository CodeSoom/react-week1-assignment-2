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
const operatorCalculationFunctions = {
  '+': (...operands) => operands.reduce((result, operand) => result + operand),
  '-': (...operands) => operands.reduce((result, operand) => result - operand),
  '*': (...operands) => operands.reduce((result, operand) => result * operand),
  '/': (...operands) => operands.reduce((result, operand) => result / operand),
};

function render({ score = 0, operands = [0], operator = '' } = {}) {
  function calculate(calculateOperands, calculateOperator) {
    return operatorCalculationFunctions[calculateOperator](...calculateOperands);
  }

  function handleClickNumber(number) {
    const copyOperands = [...operands];

    if (operator === '' || operands.length === 2) {
      const result = copyOperands[copyOperands.length - 1] * 10 + number;
      copyOperands[copyOperands.length - 1] = result;

      render({ score: result, operands: copyOperands, operator });
      return;
    }

    copyOperands.push(number);
    render({ score: number, operands: copyOperands, operator });
  }

  function handleClickOperation(nextOperator) {
    if (operands.length === 2) {
      const result = calculate(operands, operator);
      render({ score: result, operands: [result], operator: (nextOperator === '=' ? '' : nextOperator) });
      return;
    }

    render({ score, operands, operator: nextOperator });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="score">{score}</p>
      <p>
        {
          numbers.map((number) => (
            <button type="button" onClick={() => handleClickNumber(number)}>{number}</button>
          ))
        }
      </p>
      <p>
        {
          operators.map((operation) => (
            <button type="button" onClick={() => handleClickOperation(operation)}>{operation}</button>
          ))
        }
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
