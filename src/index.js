/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars,  */
/* @jsx createElement */

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const operators = [
  { sign: '+', fn: (l, r) => l + r },
  { sign: '-', fn: (l, r) => l - r },
  { sign: '*', fn: (l, r) => l * r },
  { sign: '/', fn: (l, r) => l / r },
];

const calculate = (left, right, operator) => {
  const [l, r, exec] = [Number(left), Number(right), operator.fn];
  return exec(l, r);
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
  const handleNumClick = (prevState, newNum) => {
    if (prevState.operator) {
      const nextState = {
        ...prevState,
        right: prevState.right + newNum,
        display: prevState.right + newNum,
      };
      render(nextState);
      return;
    }

    const nextState = {
      ...prevState,
      left: prevState.left + newNum,
      display: prevState.left + newNum,
    };
    render(nextState);
  };

  const handleOpClick = (prevState, operator) => {
    const { left, right, operator: prevOperator } = prevState;
    if (right) {
      const result = calculate(left, right, prevOperator);
      const nextState = {
        result,
        left: result,
        right: '',
        display: result,
        operator,
      };
      render(nextState);
      return;
    }

    const nextState = {
      ...prevState,
      operator,
    };
    render(nextState);
  };

  const handleResultClick = (prevState) => {
    const { left, right, operator } = prevState;

    if (!right) {
      return;
    }

    const result = calculate(left, right, operator);
    const nextState = {
      result,
      left: result,
      right: '',
      operator: null,
      display: result,
    };

    render(nextState);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{state.display}</p>
      <div>
        {numbers
          .map((num) => (
            <button
              type="button"
              onClick={() => handleNumClick(state, num)}
            >
              {num}
            </button>
          ))}
      </div>
      <div>
        {operators
          .map((operator) => (
            <button
              type="button"
              onClick={() => handleOpClick(state, operator)}
            >
              {operator.sign}
            </button>
          ))}
        <button
          type="button"
          onClick={() => handleResultClick(state)}
        >
          =
        </button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

const initialState = {
  result: 0,
  left: '',
  right: '',
  operator: null,
  display: '0',
};

render(initialState);
