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

const NUMBER_BUTTONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const OPERATORS = ['+', '-', '*', '/', '='];

const initialState = {
  accumulator: 0,
  number: null,
  operator: null,
};

function render({ accumulator, number, operator }) {
  function handleClickClearButton() {
    render(initialState);
  }

  function handleClickNumberButton(value) {
    render();
  }

  function handleClickOperatorButton(value) {
    render();
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number === null ? accumulator : number}</p>
      <p>
        {NUMBER_BUTTONS.map((value) => (
          <button type="button" onClick={() => handleClickNumberButton(value)}>
            {value}
          </button>
        ))}
      </p>

      <p>
        {OPERATORS.map((value) => (
        <button type="button" onClick={() => handleClickOperatorButton(value)}>
          {value}
        </button>
        ))}
        <button type="button" onClick={handleClickClearButton}>
          Clear
        </button>
      </p>
    </div>
  );

  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(element);
}

render(initialState);
