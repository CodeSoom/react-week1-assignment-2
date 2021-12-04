/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */

const app = document.getElementById('app');
const NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const OPERATORS = ['+', '-', '*', '/', '='];
const expressionStack = [];

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

function covertExpressionToResult() {
  if (expressionStack.length === 0) {
    return 0;
  }

  return expressionStack.join('');
}

function isNumber(value) {
  return /\d+/.test(value);
}
function isOperation(value) {
  return OPERATORS.includes(value);
}

function render() {
  function handleClickNumber({ target }) {
    const newNumber = target.textContent;
    const lastValue = expressionStack[expressionStack.length - 1];

    if (expressionStack.length === 0 && newNumber === '0') {
      return;
    }

    if (isOperation(lastValue) || lastValue === undefined) {
      expressionStack.push(newNumber);
    }

    if (isNumber(lastValue)) {
      expressionStack.pop();
      expressionStack.push(lastValue + newNumber);
    }

    render();
  }

  function handleClickOperator({ target }) {
    if (expressionStack.length < 1) {
      return;
    }

    const expression = target.textContent;
    expressionStack.push(expression);
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{covertExpressionToResult()}</p>
      <div>
        {NUMBERS.map((number) => (
          <button type="button" onClick={handleClickNumber}>
            {number}
          </button>
        ))}
      </div>
      <div>
        {OPERATORS.map((operation) => (
          <button type="button" onClick={handleClickOperator}>
            {operation}
          </button>
        ))}
      </div>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render();
