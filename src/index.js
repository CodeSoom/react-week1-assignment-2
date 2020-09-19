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
  func: null,
  frontOperand: 0,
  backOperand: 0,
  sum: 0,
  operatorFunc: {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  },
};

function render(props, display = 0) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];

  const {
    func, sum, frontOperand, operatorFunc, backOperand,
  } = props;

  const calculator = () => func(sum, backOperand);

  const numberOnClick = (i) => {
    if (func) {
      const num = backOperand * 10 + i;

      render({
        ...props,
        backOperand: num,
      }, num);
      return;
    }

    const num = frontOperand * 10 + i;

    render({
      ...props,
      sum: num,
      frontOperand: num,
    }, num);
  };

  const handleOnClickOperator = (operate) => {
    const operator = operatorFunc[operate];

    if (func) {
      const result = calculator();

      render({
        ...props,
        frontOperand: '',
        backOperand: '',
        sum: result,
        func: operate === '=' ? null : operator,
      }, result);
      return;
    }

    render({
      ...props,
      func: operator,
    }, frontOperand);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{display}</p>
      <p>
        {numbers.map((i) => (
          <button type="button" onClick={() => numberOnClick(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {operators.map((operator) => (
          <button type="button" onClick={() => handleOnClickOperator(operator)}>
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
