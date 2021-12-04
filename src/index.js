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

const ButtonGroup = (contentList, onClick) => (
  contentList.map((item) => Button(item, () => onClick(item)))
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
  : 0);
const component = (
  left = null,
  operator = null,
  right = null,
  accumulator = null,
  result = null,
) => {
  const setState = (...newState) => render(component(...newState));

  const clickNumber = (number) => {
    if (!operator) {
      const newLeft = Number(`${left || ''}${number}`);
      setState(newLeft, operator, right, accumulator, newLeft);
      return;
    }
    if (left && accumulator) {
      const newResult = operate(accumulator, operator, number);
      setState(newResult, null, null, newResult, newResult);
      return;
    }

    if (right === null) {
      setState(left, operator, number, accumulator, result);
      return;
    }

    const newRight = Number(`${right}${number}`);
    setState(left, operator, newRight, accumulator, newRight);
  };

  const clickOperation = (oper) => {
    if (oper === '=') {
      const newResult = operate(left, operator, right);
      setState(newResult, null, null, newResult, newResult);
      return;
    }
    setState(left, oper, right, accumulator, result);
  };
  return (
    <div>
      <p>간단 계산기</p>
      {Result(result)}
      <div>
        <section>
          {ButtonGroup([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], clickNumber)}
        </section>
        <br />
        <section>
          {ButtonGroup(['+', '-', '*', '/', '='], clickOperation)}
        </section>
      </div>
    </div>
  );
};

render(component());
