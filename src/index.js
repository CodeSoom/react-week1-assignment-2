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

const Button = (content, onClick) => (
  <button onClick={() => onClick()} type="button">
    {content}
  </button>
);

const Result = (result = 0) => (
  <p id="result">{result || 0}</p>
);

function render(child) {
  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(child);
}
const operators = {
  '+': (leftValue, rightValue) => leftValue + rightValue,
  '-': (leftValue, rightValue) => leftValue - rightValue,
  '*': (leftValue, rightValue) => leftValue * rightValue,
  '/': (leftValue, rightValue) => leftValue / rightValue,
};

const operate = (leftValue, type, rightValue) => (operators[type]
  ? operators[type](leftValue, rightValue)
  : (leftValue || rightValue));
const component = ({
  left = null,
  operator = null,
  right = null,
  accumulator = null,
  result = null,
}) => {
  const setState = (newState) => render(component(newState));

  const clickNumber = (number) => {
    if (!operator) {
      const newLeft = Number(`${left || ''}${number}`);
      setState({
        left: newLeft, 
        operator,
        right,
        accumulator,
        result: newLeft
      });
      return;
    }
    if (left && accumulator === '=') {
      const newResult = operate(accumulator, operator, number);
      setState({
        left: newResult,
        operator,
        right: number,
        accumulator: newResult,
        result: newResult
      });
      return;
    }

    if (right === null) {
      setState({
        left,
        operator,
        right: number,
        accumulator,
        result: number
      });
      return;
    }

    const newRight = Number(`${right}${number}`);
    setState({
      left,
      operator,
      right: newRight,
      accumulator,
      result: newRight
    });
  };

  const clickOperation = (oper) => {
    if (oper === '=') {
      const newResult = operate(left, operator, right);
      setState({
        left: newResult,
        operator: null,
        right: null,
        accumulator: newResult,
        result: newResult
      });
      return;
    }
    if (operator !== null) {
      // 계산한 결과를 반영한다.
      const newResult = operate(left, operator, right);
      setState({
        left: newResult,
        operator: oper,
        right: null,
        accumulator: newResult,
        result: newResult
      });
      return;
    }
    setState({
      left,
      operator: oper,
      right,
      accumulator,
      result
    });
  };
  return (
    <div>
      <p>간단 계산기</p>
      {Result(result)}
      <div>
        <section>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item) => Button(item, () => clickNumber(item)))}
        </section>
        <br />
        <section>
          {['+', '-', '*', '/', '='].map((item) => Button(item, () => clickOperation(item)))}
        </section>
      </div>
    </div>
  );
};

render(component());
