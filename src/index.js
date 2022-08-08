/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension */
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

//

const initialState = {
  accumlator: 0,
  number: 0,
  operator: '',
};

const defaultFunction = (x, y) => y || x;

const operatorFunctions = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

function calculate(accumlator, number, operator) {
  return (operatorFunctions[operator] || defaultFunction)(accumlator, number);
}

function render({ accumlator, number, operator }) {
  function handleClick(value) {
    if (typeof value === 'string') {
      render({
        accumlator: calculate(accumlator, number, operator),
        number: 0,
        operator: value,
      });
    }
    if (typeof value === 'number') {
      render({
        accumlator,
        number: number * 10 + value,
        operator,
      });
    }
  }

  function handleClickReset() {
    render(initialState);
  }

  const element = (
    <div id="hello" className="greeting">
      <p>
        <h3>{number || accumlator}</h3>
      </p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClick(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button type="button" onClick={() => handleClick(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        <button type="button" onClick={() => handleClickReset()}>
          Reset
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
