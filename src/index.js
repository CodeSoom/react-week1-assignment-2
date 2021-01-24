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
  '': (x, y) => x || y,
  '=': (x, y) => x || y,
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
};

function calculator(operator, accumulator, number) {
  return operatorFunctions[operator](accumulator, number);
}

const initialState = {
  accumulator: 0,
  number: 0,
  operator: '',
};

const render = ({ accumulator, number, operator }) => {
  function handleCilckReset() {
    render(initialState);
  }

  function handleClickNumber(value) {
    render({
      accumulator,
      number: number * 10 + value,
      operator,
    });
  }

  function handleCilckOperator(value) {
    render({
      accumulator: calculator(operator, accumulator, number),
      number: 0,
      operator: value,
    });
  }


  const element = (
    <div>
      <p>{accumulator}</p>
      <p>{number}</p>
      <p>{operator}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        <button type="button" onClick={() => handleCilckOperator('+')}>
          +
        </button>
        <button type="button" onClick={() => handleCilckOperator('-')}>
          -
        </button>
        <button type="button" onClick={() => handleCilckOperator('=')}>
          =
        </button>
      </p>
      <p>
        <button type="button" onClick={handleCilckReset}>
          Reset
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
};

render(initialState);
