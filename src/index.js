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

const operatorFuntioncs = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '/': (x, y) => x / y,
  '*': (x, y) => x * y,
};
function or(x, y) {
  return x === null ? y : x;
}
function defaultFuntion(x, y) {
  return or(y, x);
}
const initialState = {
  accumulator: 0,
  number: null,
  operator: '',
};

function calculator(operator, accumulator, number) {
  return (operatorFuntioncs[operator] || defaultFuntion)(accumulator, number);
}

function render({ accumulator, number, operator }) {
  function handleClickReset() {
    render(initialState);
  }

  function handleClickNumber(value) {
    render({
      accumulator,
      number: (number || 0) * 10 + value,
      operator,
    });
  }

  function handleClickOperator(value) {
    render({
      accumulator: calculator(operator, accumulator, number),
      number: null,
      operator: value,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      {/* <div>accumulator : {accumulator}</div> */}
      {/* <div>{operator}</div> */}
      <div>{or(number, accumulator)}</div>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
        <button type="button" onClick={() => handleClickNumber(num)}>
          {num}
        </button>
      ))}

      <div>
        {['+', '-', '/', '*', '='].map((value) => (
          <button type="button" onClick={() => handleClickOperator(value)}>
            {value}
          </button>
        ))}

        <button type="button" onClick={handleClickReset}>
          Reset
        </button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
