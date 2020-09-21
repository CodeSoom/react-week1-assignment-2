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
  // '': (x, y) => y || y,
  // '=': (x, y) => x || y,
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

// 이 부분을 어떻게 만들 것인가를 고민해보는 것이 중요!
function defaultFuncton(x, y) {
  return x || y;
}

function calculator(operator, accumulator, number) {
  return (operatorFunctions[operator] || defaultFuncton)(accumulator, number);
}

const initialState = {
  accumulator: 0,
  number: 0,
  operator: '',
};

// return result and reset operator and second num
function render({ accumulator, number, operator }) {
  function handleClickReset() {
    render(initialState);
  }

  function handleClickNumber(value) {
    render({
      accumulator,
      number: number * 10 + value,
      operator,
    });
  }

  function handleClickOperator(value) {
    render({
      accumulator: calculator(operator, accumulator, number),
      number: 0,
      operator: value,
    });
  }

  const element = (
    <div id="calculator" className="calcurating">
      <p>간단 계산기 by EHOTO</p>
      <p>{number || accumulator}</p>
      <p>
        {Array.from({ length: 10 }, (_, i) => (i + 1) % 10).map((i) => (
          <button
            type="button"
            onClick={() => handleClickNumber(i)}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button
            type="button"
            onClick={() => handleClickOperator(i)}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        <button
          type="button"
          onClick={() => handleClickReset()}
        >
          reset
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
