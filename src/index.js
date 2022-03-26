/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension */
/* @jsx createElement */

const {
  PLUS, MINUS, MULTIPLICATION, DIVISION, EQUAL, OPERATORS,
} = require('./constants');

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

const calculator = ({ acc, curr = 0, operator = '' }) => {
  if (!OPERATORS.includes(operator)) {
    return NaN;
  }

  if (Number.isNaN((acc)) || Number.isNaN((curr))) {
    return NaN;
  }

  return {
    [PLUS]: () => (acc) + (curr),
    [MINUS]: () => (acc) - (curr),
    [MULTIPLICATION]: () => (acc) * (curr),
    [DIVISION]: () => (acc / curr),
  }[operator]();
};

function render({
  screenValue = 0, acc, curr, operator,
}) {
  function handleDigits(value) {
    const renderValue = screenValue * 10 + value;

    if (operator && !curr) {
      render({
        screenValue: value,
        acc,
        curr: value,
        operator,
      });
      return;
    }

    if (operator && curr) {
      render({
        screenValue: renderValue,
        acc,
        curr: +renderValue,
        operator,
      });
      return;
    }

    render({
      screenValue: renderValue,
      acc: +renderValue,
      curr,
      operator,
    });
  }

  function handleCalculator() {
    const result = calculator({ acc, curr, operator });

    if (Number.isNaN(result)) {
      render({
        screenValue: 0,
        acc,
        curr,
        operator,
      });
      return;
    }

    render({
      screenValue: result,
      acc: result,
      curr: undefined,
      operator: operator === EQUAL ? undefined : operator,
    });
  }

  function handleOperators(op) {
    if (acc !== undefined && curr) {
      handleCalculator();
      return;
    }

    render({
      screenValue,
      acc,
      curr,
      operator: op,
    });
  }

  const element = (
    <div>
      <div id="screen">{screenValue}</div>
      <br />
      <div id="digits">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((digit) => (
          <button type="button" onClick={() => handleDigits(digit)}>{digit}</button>
        ))}
      </div>
      <br />
      <div id="operations">
        {OPERATORS.map((op) => (
          <button type="button" onClick={() => handleOperators(op)}>{op}</button>
        ))}
        <button type="button" onClick={() => handleOperators(EQUAL)}>=</button>
      </div>
    </div>
  );

  const $app = document.getElementById('app');

  $app.textContent = '';
  $app.appendChild(element);
}

render({ screenValue: 0 });
