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

const { log } = console;

const initialState = {
  prevState: 0,
  currentState: 0,
  operator: '',
};

function render(state) {
  const {
    prevState, currentState, operator,
  } = state;
  log(prevState, currentState, operator);

  function onClickNumber(number) {
    if (operator) {
      render({
        ...state,
        currentState: currentState === prevState ? 0 + number : currentState + number.toString(),
      });
      return;
    }
    render({
      ...state,
      currentState: currentState === 0 ? number : currentState + number.toString(),
    });
  }

  function onClickOperator(op) {
    render({
      ...state,
      prevState: currentState,
      operator: op,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{currentState}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button
            type="button"
            onClick={() => onClickNumber(i)}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((j) => (
          <button
            type="button"
            onClick={() => onClickOperator(j)}
          >
            {j}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
