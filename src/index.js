/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars,  */
/* @jsx createElement */

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const operators = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

const calculate = (left, right, operator) => operator(Number(left), Number(right));

const initialState = {
  result: 0,
  left: '',
  right: '',
  operator: null,
  display: '0',
};

const handleNumClick = (prevState, num) => {
  const {
    left, right, operator,
  } = prevState;

  return operator ? {
    ...prevState,
    right: right + num,
    display: right + num,
  } : {
    ...prevState,
    left: left + num,
    display: left + num,
  };
};

const handleOpClick = (prevState, operator) => {
  const { left, right, operator: prevOperator } = prevState;

  if (!right) {
    return { ...prevState, operator };
  }

  const result = calculate(left, right, prevOperator);
  return {
    ...initialState,
    result,
    left: result,
    display: result,
    operator,
  };
};

const handleResultClick = (prevState) => {
  const { left, right, operator } = prevState;

  if (!right) {
    return prevState;
  }

  const result = calculate(left, right, operator);
  return {
    ...initialState,
    result,
    left: result,
    display: result,
  };
};


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

function render(state) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{state.display}</p>
      <div>
        {numbers
          .map((num) => (
            <button
              type="button"
              onClick={() => render(handleNumClick(state, num))}
            >
              {num}
            </button>
          ))}
      </div>
      <div>
        {Object.entries(operators)
          .map(([sign, fn]) => (
            <button
              type="button"
              onClick={() => render(handleOpClick(state, fn))}
            >
              {sign}
            </button>
          ))}
        <button
          type="button"
          onClick={() => render(handleResultClick(state))}
        >
          =
        </button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
