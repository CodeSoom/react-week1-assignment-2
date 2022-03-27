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

function render({ display, expression, usedOperator }) {
  const title = (
    <div>
      <p>간단 계산기</p>
      <h3 id="display">{display}</h3>
    </div>
  );

  function lastInputIsOperator() {
    return Number.isNaN(Number(expression[expression.length - 1]));
  }

  function handleClickNumber(clickedNumber) {
    if (display === '0') {
      return render(
        {
          display: clickedNumber,
          expression: clickedNumber,
          usedOperator,
        },
      );
    }

    if (lastInputIsOperator()) {
      return render(
        {
          display: clickedNumber,
          expression: expression + clickedNumber,
          usedOperator,
        },
      );
    }

    return render(
      {
        display: display + clickedNumber,
        expression: expression + clickedNumber,
        usedOperator,
      },
    );
  }

  const operatorExecutor = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };

  function calculate() {
    const splitedExpression = expression.split(usedOperator);
    const operand1 = Number(splitedExpression[0]);
    const operand2 = Number(splitedExpression[1]);

    return operatorExecutor[usedOperator](operand1, operand2);
  }

  function handleClickOperator(clickedOperator) {
    if (display === '0') {
      return false;
    }

    if (clickedOperator === '=') {
      return render(
        {
          display: calculate(),
          expression: calculate(),
          usedOperator: '',
        },
      );
    }

    if (usedOperator) {
      return render(
        {
          display: calculate(),
          expression: calculate() + clickedOperator,
          usedOperator: clickedOperator,
        },
      );
    }

    return render(
      {
        display,
        expression: expression + clickedOperator,
        usedOperator: clickedOperator,
      },
    );
  }

  const calculator = (
    <div>
      <p>
        {
          ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((number) => (
            <button type="button" onClick={() => handleClickNumber(number)}>
              {number}
            </button>
          ))
        }
      </p>
      <p>
        {
          ['+', '-', '*', '/', '='].map((operator) => (
            <button type="button" onClick={() => handleClickOperator(operator)}>
              {operator}
            </button>
          ))
        }
      </p>
    </div>
  );

  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(title);
  app.appendChild(calculator);
}

const initialValue = {
  display: '0',
  expression: '0',
  usedOperator: '',
};

render(initialValue);
