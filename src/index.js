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
  operateStatus: null,
  operand: 0,
  sum: 0,
};


function render(props, display = 0) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];
  const operatorFunc = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };

  const { operateStatus, sum, operand } = props;

  const calculator = () => operateStatus(sum, operand);

  const numberOnClick = (i) => {
    if (operateStatus) {
      const num = operand * 10 + i;

      render({
        ...props,
        operand: num,
      }, num);
      return;
    }

    const num = sum * 10 + i;

    render({
      ...props,
      sum: num,
    }, num);
  };

  const handleOnClickOperator = (operate) => {
    const operator = operatorFunc[operate];

    if (operateStatus) {
      const result = calculator();

      render({
        ...props,
        operateStatus: operate === '=' ? null : operator,
        operand: 0,
        sum: result,
      }, result);
      return;
    }

    render({
      ...props,
      operateStatus: operator,
    }, sum);
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
