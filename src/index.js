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
  sum: 0,
  func: null,
  frontNum: 0,
  backNum: 0,
  display: 0,
  operators: {
    '+': (frontOperand, backOperand) => frontOperand + backOperand,
    '-': (frontOperand, backOperand) => frontOperand - backOperand,
    '*': (frontOperand, backOperand) => frontOperand * backOperand,
    '/': (frontOperand, backOperand) => frontOperand / backOperand,
  },
};

function render(props) {
  const NUMBER_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const OPERATOR_LIST = ['+', '-', '*', '/', '='];

  const {
    func, sum, frontNum, operators, backNum, display,
  } = props;

  const numberOnClick = (i) => {
    if (func) {
      const num = `${backNum + i}`;

      render({
        ...props,
        backNum: num,
        display: num,
      });
    } else {
      const num = `${frontNum + i}`;

      render({
        ...props,
        sum: parseInt(num, 10),
        frontNum: num,
        display: num,
      });
    }
  };

  const calculator = (operate) => {
    const operator = operators[operate];

    if (func) {
      const result = func(sum, parseInt(backNum, 10));

      render({
        ...props,
        frontNum: '',
        backNum: '',
        sum: result,
        display: result,
        func: operate === '=' ? null : operator,
      });
    } else {
      render({
        ...props,
        func: operator,
      });
    }
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{display}</p>
      <p>
        {NUMBER_LIST.map((i) => (
          <button type="button" onClick={() => numberOnClick(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {OPERATOR_LIST.map((operator) => (
          <button type="button" onClick={() => calculator(operator)}>
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
