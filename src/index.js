/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */

const $app = document.getElementById('app');
const NUMBER_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const OPERATOR_LIST = ['+', '-', '*', '/', '='];
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

function render() {
  function handleClickNumber({ target }) {
    const number = target.textContent;

    if (expressionStack.length <= 0) {
      if (number === '0') {
        return;
      }

      expressionStack.push(number);
      return;
    }

    const value = expressionStack.pop();
    if (NUMBER_LIST.includes(value)) {
      expressionStack.push(value + number);
      render();
      return;
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

  const $element = (
    <div>
      <p>간단 계산기</p>
      <p>{covertExpressionToResult()}</p>
      <div>
        {NUMBER_LIST.map((number) => (
          <button type="button" onClick={handleClickNumber}>
            {number}
          </button>
        ))}
      </div>
      <div>
        {OPERATOR_LIST.map((operation) => (
          <button type="button" onClick={handleClickOperator}>
            {operation}
          </button>
        ))}
      </div>
    </div>
  );

  $app.textContent = '';
  $app.appendChild($element);
}

render();
