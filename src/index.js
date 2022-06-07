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

const operators = {
  plus: '+',
  minus: '-',
  multiply: '*',
  divide: '/',
  equal: '=',
};

function render(result = 0, operand, operator) {
  function handleClickOperand(value) {
    if (operand) {
      render(result, Number(`${operand}${value}`), operator);
      return;
    }

    render(result, value, operator);
  }

  function getNewResult() {
    if (operator === operators.plus) return result + operand;
    if (operator === operators.minus) return result - operand;
    if (operator === operators.multiply) return result * operand;
    if (operator === operators.divide) return result / operand;
    if (operator === operators.equal) return result;
    return operand;
  }

  function handleClickOperator(value) {
    render(getNewResult(), null, value);
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{typeof operand === 'number' ? operand : result}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button
            type="button"
            onClick={() => handleClickOperand(i)}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        <button
          type="button"
          onClick={() => handleClickOperator(operators.plus)}
        >
          {operators.plus}
        </button>
        <button
          type="button"
          onClick={() => handleClickOperator(operators.minus)}
        >
          {operators.minus}
        </button>
        <button
          type="button"
          onClick={() => handleClickOperator(operators.multiply)}
        >
          {operators.multiply}
        </button>
        <button
          type="button"
          onClick={() => handleClickOperator(operators.divide)}
        >
          {operators.divide}
        </button>
        <button
          type="button"
          onClick={() => handleClickOperator(operators.equal)}
        >
          {operators.equal}
        </button>
      </p>
    </div>
  );

  const container = document.getElementById('app');
  container.textContent = '';
  container.appendChild(element);
}

render();
