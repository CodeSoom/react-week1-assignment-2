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

const initialState = {
  number: 0,
  count: 0,
  operator: '',
};

const operators = {
  '': (x, y) => x || y,
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
  '=': (x, y) => x || y,
};

function calculate(number, count, operator) {
  return operators[operator](count, number);
}

function render({ number, count, operator }) {
  // return operators[count](number);

  function clickReset() {
    render(initialState);
  }

  function clickNumber(value) {
    render({
      number: number * 10 + value,
      count,
      operator,
    });
  }

  function clickOperator(value) {
    render({
      count: calculate(number, count, operator),
      number: 0,
      operator: value,
    });
  }

  const element = (
    <div>
      <h3>CoseSoom assignment 2</h3>
      <p>간단 계산기</p>
      <p>{number || count}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => clickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {/* {Object.keys(operator).map((i) => (
          <button type="button" onClick={() => clickOperator(i)}>
            {i}
          </button>
        ))} */}

        {['+', '-', '*', '/', '='].map((i) => (
          <button type="button" onClick={() => clickOperator(i)}>
            {i}
          </button>
        ))}

      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
