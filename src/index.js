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

const calculate = (left, operator, right) => {
  const operators = {
    '+': plus(Number(left), Number(right)),
    '-': minus(Number(left), Number(right)),
    '*': multiply(Number(left), Number(right)),
    '/': divide(Number(left), Number(right)),
  };
  return operators[operator];
};

const render = (left = 0, operator, right, result, currentState = 'left') => {
  const handleClickNumber = (number) => {
    if (currentState === 'left') {
      render((left || '') + number.toString(), operator, right, '', currentState);
    }
    if (currentState === 'right') {
      render(left, operator, right + number.toString(), '', currentState);
    }
    if (currentState === 'result') {
      render(number, '', '', '', 'left');
    }
  };

  const handleClickOperator = (clickedOperator) => {
    if (currentState === 'left') {
      render(left, clickedOperator, '', '', 'right');
      return;
    }
    if (currentState === 'right') {
      if (clickedOperator === '=') {
        render('', '', '', calculate(left, operator, right), 'result');
        return;
      }
      render(calculate(left, operator, right), clickedOperator, '', calculate(left, operator, right), 'right');
      return;
    }
    if (currentState === 'result') {
      render(result, clickedOperator, '', '', 'right');
    }
  };

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
              () => handleClickNumber(i)
            }
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {OPERATORS.map((i) => (
          <button type="button" onClick={() => handleClickOperator(i)}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );
  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
};
render();
