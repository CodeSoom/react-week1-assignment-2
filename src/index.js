/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */

const NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const OPERATORS = ['+', '-', '*', '/', '='];

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

const display = (left, operator, right = 0, result, currentState = 'left') => {
  if (currentState === 'left') return left;
  if (currentState === 'result') return result;
  if (currentState === 'right') {
    return right || left;
  }
  return 0;
};


const plus = (x, y) => x + y;
const minus = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => (x ? x / y : 0);

function calculate(operator) {
  return (x, y) => {
    const operators = {
      '+': plus(x, y),
      '-': minus(x, y),
      '*': multiply(x, y),
      '/': divide(x, y),
    };
    return operators[operator];
  };
}

const render = ({
  left = 0,
  operator,
  right,
  result,
  currentState = 'left',
}) => {
  function handleClickNumber(number) {
    if (currentState === 'left') {
      render({
        left: (left || '') + number.toString(),
        operator,
        right,
        result: '',
        currentState,
      });
    }
    if (currentState === 'right') {
      render({
        left,
        operator,
        right: right + number.toString(),
        result: '',
        currentState,
      });
    }
    if (currentState === 'result') {
      render({
        left: number,
        operator: '',
        right: '',
        result: '',
        currentState: 'left',
      });
    }
  }

  function handleClickOperator(clickedOperator) {
    if (currentState === 'left') {
      return {
        left,
        operator: clickedOperator,
        right: '',
        result: '',
        currentState: 'right',
      };
    }
    if (currentState === 'right') {
      if (clickedOperator === '=') {
        return {
          left: '',
          operator: '',
          right: '',
          result: calculate(operator)(Number(left), Number(right)),
          currentState: 'result',
        };
      }
      return {
        left: calculate(operator)(Number(left), Number(right)),
        operator: clickedOperator,
        right: '',
        result: calculate(operator)(Number(left), Number(right)),
        currentState: 'right',
      };
    }
    if (currentState === 'result') {
      return {
        left: result,
        operator: clickedOperator,
        right: '',
        result: '',
        currentState: 'right',
      };
    }
    return {};
  }

  const element = (
    <div>
      <div id="displayArea" className="display">
        {display(left, operator, right, result, currentState)}
      </div>
      <p>
        {NUMBERS.map((i) => (
          <button
            type="button"
            onClick={
              () => render(handleClickNumber(i))
            }
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {OPERATORS.map((i) => (
          <button
            type="button"
            onClick={
              () => render(handleClickOperator(i))
            }
          >
            {i}
          </button>
        ))}
      </p>
    </div>
  );
  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
};
render({});
