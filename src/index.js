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

function plus(a, b) {
  return a + b;
}

function minus(a, b) {
  return a - b;
}

function multi(a, b) {
  return a * b;
}

function division(a, b) {
  return a / b;
}

function defaultOperator(x, y) {
  return y || x;
}

const operatorFunctions = {
  '+': plus,
  '-': minus,
  '*': multi,
  '/': division,
};

function calculate({ number, operator, result } = {}) {
  return (operatorFunctions[operator] || defaultOperator)(result, number);
}

function rootRender(element) {
  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(element);
}

const initialState = { number: 0, operator: '', result: 0 };

function render({ number, operator, result }) {
  function handleClickNumber(value) {
    render({
      number: number * 10 + value,
      operator,
      result,
    });
  }

  function handleClickOperation(value) {
    render({
      number: 0,
      operator: value,
      result: calculate({ number, operator, result }),
    });
  }

  function handleClickEqual() {

  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number}</p>
      <p>{operator}</p>
      <p>{result}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>{i}</button>))}
      </p>
      <p>
        {Object.keys(operatorFunctions).map((op) => (
          <button type="button" onClick={() => handleClickOperation(op)}>{op}</button>))}
        <button type="button" onClick={handleClickEqual}>=</button>
      </p>
    </div>
  );

  rootRender(element);
}

render(initialState);
