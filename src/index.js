/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */

const NUMPAD_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const OPERATORS = [
  { symbol: '+', calculate: (x, y) => x + y },
  { symbol: '-', calculate: (x, y) => x - y },
  { symbol: '*', calculate: (x, y) => x * y },
  { symbol: '/', calculate: (x, y) => x / y },
];

const INITIAL_STATE = {
  operator: '',
  x: 0,
  y: 0,
  display: 0,
};

function render(state) {
  const handleNumPadClick = (number) => {
    if (!state.operator) {
      const x = parseInt(`${state.x}${number}`, 10);

      render({
        ...state,
        x,
        display: x,
      });
      return;
    }

    const y = parseInt(`${state.y}${number}`, 10);

    render(
      {
        ...state,
        y,
        display: y,
      },
    );
  };

  const handleOperatorClick = (nextOperator) => {
    if (state.operator) {
      const result = state.operator.calculate(state.x, state.y);

      render({
        ...INITIAL_STATE,
        operator: nextOperator,
        x: result,
        display: result,
      });
      return;
    }

    render({
      ...state,
      operator: nextOperator,
    });
  };

  const handleCalculateClick = () => {
    const result = state.operator.calculate(state.x, state.y);

    render({
      ...INITIAL_STATE,
      x: result,
      display: result,
    });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{state.display}</p>
      <p>
        {NUMPAD_NUMBERS.map((number) => (
          <button type="button" onClick={() => handleNumPadClick(number)}>{number}</button>
        ))}
      </p>
      <p>
        {OPERATORS.map((operator) => (
          <button type="button" onClick={() => handleOperatorClick(operator)}>{operator.symbol}</button>
        ))}
        <button type="button" onClick={handleCalculateClick}>=</button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(INITIAL_STATE);

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
