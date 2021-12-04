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

function render(props) {
  const {
    previousOperand, currentOperand, operator,
  } = props;
  function compute() {
    switch (operator) {
    case '+':
      render({
        ...props, currentOperand: previousOperand + currentOperand, operator: '',
      });
      break;
    case '-':
      render({ ...props, currentOperand: previousOperand - currentOperand, operator: '' });
      break;
    case '*':
      render({ ...props, currentOperand: previousOperand * currentOperand, operator: '' });
      break;
    case '/':
      render({ ...props, currentOperand: previousOperand / currentOperand, operator: '' });
      break;
    default:
      break;
    }
  }

  function appendNumber(event) {
    const clickedNumber = Number(event.target.value);
    const appendedNumber = Number(`${currentOperand}${clickedNumber}`);

    if (operator) {
      render({ ...props, previousOperand: currentOperand, currentOperand: clickedNumber });
      return;
    }

    render({ ...props, currentOperand: appendedNumber });
  }

  function chooseOperator(event) {
    const clickedOperator = event.target.value;

    render({ ...props, operator: clickedOperator });
  }

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{currentOperand}</p>
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
            onClick={operatorItem === '=' ? () => compute() : chooseOperator}
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
  previousOperand: 0, currentOperand: 0, operator: '',
});
