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

function calculate(num1, operator, num2) {
  let result;

  switch (operator) {
  case '+':
    result = num1 + num2;
    break;

  case '-':
    result = num1 - num2;
    break;

  case '/':
    result = num1 / num2;
    break;

  case '*':
    result = num1 * num2;
    break;

  default:
    break;
  }
  return result;
}

function render(state) {
  const handleClickNumber = (num) => {
    if (!state.prev || typeof state.prev === 'string') {
      render({
        ...state,
        total: state.display,
        display: num,
        prev: num,
      });
    } else {
      const display = state.display * 10 + num;
      render({
        ...state,
        display,
        prev: num,
      });
    }
  };

  const handleClickOperator = (operator) => {
    if (!state.operator) {
      if (operator === '=') {
        render({
          ...state,
          operator: null,
          prev: null,
        });
      } else {
        render({
          ...state,
          operator,
          prev: operator,
        });
      }
    } else {
      const result = calculate(state.total, state.operator, state.display);

      if (operator === '=') {
        render({
          ...state,
          display: result,
          operator: null,
          prev: null,
          total: null,
        });
      } else {
        render({
          ...state,
          display: result,
          operator,
          total: result,
          prev: operator,
        });
      }
    }
  };

  const handleClick = (value) => {
    if (typeof value === 'number') {
      handleClickNumber(value);
    } else {
      handleClickOperator(value);
    }
  };

  const calculatorTemplate = (
    <div>
      <div>{state.display}</div>
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button type="button" onClick={() => handleClick(num)}>{num}</button>
        ))}
      </div>
      <div>
        {['+', '-', '*', '/', '='].map((str) => (
          <button type="button" onClick={() => handleClick(str)}>{str}</button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(calculatorTemplate);
}

const initState = {
  display: 0,
  total: null,
  operator: null,
  prev: null,
};

render(initState);
