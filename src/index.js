/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */
const operatorButtons = ['+', '-', '*', '/', '='];
const numberButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const initialState = {
  holdingValue: '0',
  holdingOperator: '=',
  display: '0',
  previous: '0',
};
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

  switch (operator) {
  case ('+'):
    return `${l + r}`;
  case ('-'):
    return `${l - r}`;
  case ('*'):
    return `${l * r}`;
  case ('/'):
    return `${l / r}`;
  case ('='):
    return `${r}`;
  default:
    return null;
  }
};
const render = (sstate) => {
  const reRender = (e, state) => {
    const {
      holdingValue: hv,
      holdingOperator: ho,
      display: d,
      previous: p,
    } = state;
    const current = e.target.textContent;

    if (isOperator(current)) {
      if (!isOperator(p)) {
        const calculated = calculate(hv, ho, d);
        render({
          holdingValue: calculated,
          holdingOperator: current,
          display: calculated,
          previous: current,
        });
      } else {
        render({
          ...state,
          holdingOperator: current,
          previous: current,
        });
      }
    } else if (d !== '0' && !isOperator(p)) {
      render({
        ...state,
        display: d + current,
        previous: current,
      });
    } else {
      render({
        ...state,
        display: current,
        previous: current,
      });
    }
  };

  const element = (
    <div id="simpleCalculator">
      <h1>간단 계산기</h1>
      <h2>{sstate.display}</h2>
      <p>
        {numberButtons.map((number) => (
          <button
            type="button"
            onClick={(e) => reRender(e, sstate)}
          >
            {number}
          </button>
        ))}
      </p>

      <p>
        {operatorButtons.map((operator) => (
          <button
            type="button"
            onClick={(e) => reRender(e, sstate)}
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

render(initialState);
