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

const calculations = [
  {
    operator: 'plus',
    symbol: '+',
  },
  {
    operator: 'minus',
    symbol: '-',
  },
  {
    operator: 'multiply',
    symbol: '*',
  },
  {
    operator: 'divide',
    symbol: '/',
  },
];

const initGlobalStates = {
  operand1State: 0,
  operatorState: '',
  operand2State: 0,
  showNumberState: 0,
};

function render(globalStates) {
  const { showNumberState } = globalStates;

  const getOperand2 = (operand2, number) => (operand2 === 0 ? number : operand2 * 10 + number);

  const handleClickNumber = (states, inputNumber) => {
    const { operand2State } = states;

    const nowNumber = getOperand2(operand2State, inputNumber);

    render({ ...states, operand2State: nowNumber, showNumberState: nowNumber });
  };

  const calculate = (calculationName) => {
    const calculates = {
      plus(operand1, operand2) {
        return operand1 + operand2;
      },
      minus(operand1, operand2) {
        return operand1 - operand2;
      },
      multiply(operand1, operand2) {
        return operand1 * operand2;
      },
      divide(operand1, operand2) {
        return operand1 / operand2;
      },
    };

    return calculates[calculationName];
  };

  const handleClickOperator = (states, inputOperator) => {
    const { operand1State, operatorState, operand2State } = states;

    const operand1 = operatorState === '' ? operand2State : calculate(operatorState)(operand1State, operand2State);

    render({
      operand1State: operand1,
      operatorState: inputOperator,
      operand2State: 0,
      showNumberState: operand1,
    });
  };

  const handleClickShowTotal = (states) => {
    const { operand1State, operatorState, operand2State } = states;
    const total = calculate(operatorState)(operand1State, operand2State);
    render({
      operand1State: 0,
      operatorState: '',
      operand2State: 0,
      showNumberState: total,
    });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{showNumberState}</p>
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
            onClick={() => handleClickOperator(globalStates, calculation.operator)}
          >
            {calculation.symbol}
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
