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
  const {
    func, sum, frontNum, operators, backNum, display,
  } = props;
  const numberOnClick = (i) => {
    if (func) {
      render({
        ...props,
        backNum: `${backNum + i}`,
        display: `${backNum + i}`,
      });
    } else {
      render({
        ...props,
        sum: parseInt(`${frontNum + i}`, 10),
        frontNum: `${frontNum + i}`,
        display: `${frontNum + i}`,
      });
    }
  };

  const calculator = (operate) => {
    const cal = operators[operate];
    if (operate === '=') {
      const result = func(sum, parseInt(backNum, 10));
      render({
        ...props,
        frontNum: '',
        backNum: '',
        func: null,
        sum: result,
        display: result,
      });
    } else if (func) {
      const result = func(sum, parseInt(backNum, 10));
      render({
        ...props,
        backNum: '',
        frontNum: '',
        sum: result,
        display: result,
        func: cal,
      });
    } else {
      render({
        ...props,
        func: cal,
      });
    }
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{display}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => numberOnClick(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((operator) => (
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
