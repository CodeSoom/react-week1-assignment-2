/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase() === 'classname' ? 'className' : key.toLowerCase()] = value;
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

function render(props) {
  const {
    previousOperand, currentOperand, operator, result,
  } = props;

  function getCalculatedCount() {
    switch (operator) {
    case '+':
      return previousOperand + currentOperand;
    case '-':
      return previousOperand - currentOperand;
    case '*':
      return previousOperand * currentOperand;
    case '/':
      return previousOperand / currentOperand;
    default:
      throw new Error('잘못된 operator');
    }
  }

  function compute(operatorValue) {
    const calculatedCount = getCalculatedCount();
    render({
      ...props,
      currentOperand: 0,
      previousOperand: calculatedCount,
      result: calculatedCount,
      operator: operatorValue,
    });
  }

  function appendNumber(event) {
    const button = event.target;
    const clickedNumber = Number(button.value);
    const appendedNumber = Number(`${currentOperand}${clickedNumber}`);

    render({ ...props, currentOperand: appendedNumber, result: appendedNumber });
  }

  function chooseOperator(event) {
    const clickedOperator = event.target.value;

    if (operator) {
      compute(clickedOperator);
      return;
    }

    render({
      ...props, operator: clickedOperator, previousOperand: currentOperand, currentOperand: 0,
    });
  }

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];
  const element = (
    <div>
      <p>간단 계산기</p>
      <p className="currentCount">{result}</p>
      <p>
        {numbers.map((number) => (
          <button type="button" value={number} onClick={appendNumber}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {operators.map((operatorItem) => (
          <button
            type="button"
            value={operatorItem}
            onClick={operatorItem === '=' ? () => compute('') : chooseOperator}
          >
            {operatorItem}
          </button>
        ))}
      </p>
    </div>
  );

  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(element);
}

render({
  previousOperand: 0, currentOperand: 0, operator: '', result: 0,
});
