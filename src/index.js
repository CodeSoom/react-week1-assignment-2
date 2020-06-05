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

const calculations = ['+', '-', '*', '/'];

const initGlobalStates = {
  operand1: 0,
  operator: '',
  operand2: 0,
  showNumber: 0,
};

function render(globalStates) {
  const { showNumber } = globalStates;

  const getOperand2 = (operand2, number) => (operand2 === 0 ? number : operand2 * 10 + number);

  const handleClickNumber = (states, inputNumber) => {
    const { operand2 } = states;

    const nowNumber = getOperand2(operand2, inputNumber);

    render({ ...states, operand2: nowNumber, showNumber: nowNumber });
  };

  const operations = {};
  operations['+'] = (operand1, operand2) => operand1 + operand2;
  operations['-'] = (operand1, operand2) => operand1 - operand2;
  operations['*'] = (operand1, operand2) => operand1 * operand2;
  operations['/'] = (operand1, operand2) => operand1 / operand2;

  const calculate = (states) => {
    const { operator, operand1, operand2 } = states;

    return operations[operator](operand1, operand2);
  };

  const getOperand1 = (states) => {
    const { operator, operand2 } = states;

    return operator === '' ? operand2 : calculate(states);
  };

  const handleClickOperator = (states, inputOperator) => {
    const operand1 = getOperand1(states);

    render({
      operand1,
      operator: inputOperator,
      operand2: 0,
      showNumber: operand1,
    });
  };

  const handleClickShowTotal = (states) => {
    const total = calculate(states);
    render({
      operand1: 0,
      operator: '',
      operand2: 0,
      showNumber: total,
    });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{showNumber}</p>
      <p>
        {numbers.map((number) => (
          <button
            type="button"
            onClick={() => handleClickNumber(globalStates, number)}
          >
            {number}
          </button>
        ))}
      </p>
      <p>
        {calculations.map((calculation) => (
          <button
            type="button"
            onClick={() => handleClickOperator(globalStates, calculation)}
          >
            {calculation}
          </button>
        ))}
        <button
          type="button"
          onClick={() => handleClickShowTotal(globalStates)}
        >
          =
        </button>
      </p>
      <p />
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initGlobalStates);
