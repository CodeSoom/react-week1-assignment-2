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

const operatorFunctions = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

const defaultOperator = (x, y) => y || x;

const calculate = (x, y, operation) => (operatorFunctions[operation] || defaultOperator)(x, y);

const initialState = {
  x: 0,
  y: null,
  operation: '',
};

function render({ x, y, operation }) {
  const handleCalculator = (e) => {
    const nextOperation = e.target.value;
    const result = calculate(parseFloat(x), parseFloat(y), operation);

    render({
      x: result,
      y: null,
      operation: nextOperation,
    });
  };

  const handleClickNumber = (e) => {
    const next = e.target.value;
    render({
      x,
      y: `${!y ? next : y + next}`,
      operation,
    });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{y || x}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => <button type="button" value={i} onClick={(e) => handleClickNumber(e)}>{i}</button>)}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => <button type="button" value={i} onClick={(e) => handleCalculator(e)}>{i}</button>)}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
