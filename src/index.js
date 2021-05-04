/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */
const operatorButtons = ['+', '-', '*', '/', '='];
const numberButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const initial = ['0', '=', '0', '0'];
const toNumber = (_) => Number(_);

const createElement = (tagname, props, ...children) => {
  const element = document.createElement(tagname);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    const nodeToAppend = (child instanceof Node)
      ? child
      : document.createTextNode(child);

    element.appendChild(nodeToAppend);
  });

  return element;
};

const isOperator = (input) => (operatorButtons.includes(input));
const calculate = (left, operator, right) => {
  const [l, r] = [left, right].map(toNumber);

  if (operator === '+') {
    return `${l + r}`;
  }
  if (operator === '-') {
    return `${l - r}`;
  }
  if (operator === '*') {
    return `${l * r}`;
  }
  if (operator === '/') {
    return `${l / r}`;
  }
  if (operator === '=') {
    return r;
  }
  return null;
};
const render = (holdingValue, holdingOperator, display, previous) => {
  const reRender = (e, hv, ho, d, p) => {
    const current = e.target.textContent;
    if (isOperator(current)) {
      if (!isOperator(p)) {
        const calculated = calculate(hv, ho, d);
        render(calculated, current, calculated, current);
      } else {
        render(hv, current, d, current);
      }
    } else if (d !== '0' && !isOperator(p)) {
      render(hv, ho, d + current, current);
    } else {
      render(hv, ho, current, current);
    }
  };

  const element = (
    <div id="simpleCalculator">
      <h1>간단 계산기</h1>
      <h2>{display}</h2>
      <p>
        {numberButtons.map((number) => (
          <button
            type="button"
            onClick={(e) => reRender(
              e,
              holdingValue,
              holdingOperator,
              display, previous,
            )}
          >
            {number}
          </button>
        ))}
      </p>

      <p>
        {operatorButtons.map((operator) => (
          <button
            type="button"
            onClick={(e) => reRender(
              e,
              holdingValue,
              holdingOperator,
              display, previous,
            )}
          >
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  const container = document.getElementById('app');
  container.textContent = '';
  container.appendChild(element);
};

render(...initial);
