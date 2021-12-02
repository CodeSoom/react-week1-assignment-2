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

const OPERATION_ENUM = {
  '+': 'plus',
  '-': 'minus',
  '*': 'multiply',
  '/': 'divide',
  '=': 'equal',
  plus: '+',
  minus: '-',
  multiply: '*',
  divide: '/',
  equal: '=',
};

const Button = (content, onClick) => (
  <button onClick={() => onClick()} type="button">
    {content}
  </button>
);

const ButtonGroup = (contentList, onClick) => (
  contentList.map((item) => Button(item, () => onClick(item)))
);

const Result = (result = 0) => (
  <p id="result">{result}</p>
);

function render(child) {
  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(child);
}

const operate = (leftValue, type, rightValue) => {
  switch (type) {
  case OPERATION_ENUM.plus:
    return leftValue + rightValue;
  case OPERATION_ENUM.minus:
    return leftValue - rightValue;
  case OPERATION_ENUM.multiply:
    return leftValue * rightValue;
  case OPERATION_ENUM.divide:
    return leftValue / rightValue;
  default:
    return 0;
  }
};

const component = (state = {
  left: null, operator: null, right: null, accumulator: 0,
}) => {
  const setState = (newState) => render(component(newState));

  const inputNumber = (n) => {
    if (state.left === null) {
      setState({ ...state, left: n, accumulator: n });
    } else if (!state.operator && !state.right) {
      const newLeft = Number(`${state.left}${n}`);
      setState({ ...state, left: newLeft, accumulator: newLeft });
    } else if (state.operator) {
      if (state.right === null) {
        setState({ ...state, right: n, accumulator: n });
      } else {
        const newRight = Number(`${state.right}${n}`);
        setState({ ...state, right: newRight, accumulator: newRight });
      }
    }
  };

  const setOperation = (oper) => {
    if (oper === OPERATION_ENUM.equal) {
      const result = operate(state.left, state.operator, state.right);
      setState({
        left: result, operator: null, right: null, accumulator: result,
      });
      return;
    }
    setState({ ...state, operator: oper });
  };
  return (
    <div>
      <p>간단 계산기</p>
      {Result(state.accumulator)}
      <div>
        <section>
          {ButtonGroup([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], inputNumber)}
        </section>
        <br />
        <section>
          {ButtonGroup(['+', '-', '*', '/', '='], setOperation)}
        </section>
      </div>
    </div>
  );
};

render(component());
