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

const calculator = ({ first, second = 0, operator = '' }) => {
  if (!OPERATORS.includes(operator)) {
    return NaN;
  }

  if (Number.isNaN((first)) || Number.isNaN((second))) {
    return NaN;
  }

  return {
    [PLUS]: () => (first) + (second),
    [MINUS]: () => (first) - (second),
    [MULTIPLICATION]: () => (first) * (second),
    [DIVISION]: () => (first / second),
  }[operator]();
};

function render({
  screenValue = '0', first, second, operator,
}) {
  function handleDigits(value) {
    const renderValue = +screenValue === 0 ? value : `${screenValue}${value}`;

    if (operator && !second) {
      render({
        screenValue: value,
        first,
        second: value,
        operator,
      });
      return;
    }

    if (operator && second) {
      render({
        screenValue: renderValue,
        first,
        second: +renderValue,
        operator,
      });
      return;
    }

    render({
      screenValue: renderValue,
      first: +renderValue,
      second,
      operator,
    });
  }

  function handleCalculator() {
    const result = calculator({ first, second, operator });

    if (Number.isNaN(result)) {
      render({
        screenValue: '0',
        first,
        second,
        operator,
      });
      return;
    }

    render({
      screenValue: result,
      first: result,
      second: undefined,
      operator: operator === EQUAL ? undefined : operator,
    });
  }

  function handleOperators(op) {
    if (first !== undefined && second) {
      handleCalculator();
      return;
    }

    render({
      screenValue,
      first,
      second,
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

render({ screenValue: '0' });
