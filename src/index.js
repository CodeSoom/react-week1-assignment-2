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

function updateValue(current, previous) {
  if (typeof current === 'number' && typeof previous === 'number') {
    return previous * 10 + current;
  }
  return current;
}

function evaluateExpression(expression) {
  const exp = expression.slice();
  if (typeof expression[expression.length - 1] === 'string') {
    exp.pop();
  }
  return eval(exp.join(''));
}

function updateExpression(expression, value) {
  if (typeof expression[expression.length - 1] === 'number' && typeof value === 'number') {
    expression.pop();
  }
  expression.push(value);
  return expression;
}

function updateDisplay(value, display, expression) {
  if (typeof expression[expression.length - 1] === 'string') {
    return evaluateExpression(expression);
  }
  if (expression && expression.length > 0) {
    return expression[expression.length - 1];
  }
  return display;
}

function updateState(state) {
  let { value, expression, display } = state;
  if (value === '=') {
    return { value: 0, expression: [], display: evaluateExpression(expression) };
  }
  value = updateValue(value, expression[expression.length - 1]);
  expression = updateExpression(expression, value);
  display = updateDisplay(value, display, expression);

  console.log(expression);
  return {
    ...state,
    expression,
    display,
  };
}

function render(state = { value: 0, expression: [], display: 0 }) {
  const { display } = state;
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{display}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((value) => (
          <button type="button" onClick={() => render(updateState({ ...state, value }))}>{value}</button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((value) => (
          <button type="button" onClick={() => render(updateState({ ...state, value }))}>{value}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
