/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const OPERATORS = ['+', '-', '*', '/', '='];
const INIT_COUNT = 0;

const app = document.getElementById('app');

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

function calculate(a, b, operator) {
  switch (operator) {
  case '+':
    return a + b;
  case '-':
    return a - b;
  case '*':
    return a * b;
  case '/':
    return a / b;
  default:
    return 0;
  }
}

function render(props) {
  const onClickNumber = ({ target: { value } }) => {
    if (!props.clickedOperator) {
      const mergedNumber = String(props.count) + value;
      render({
        ...props,
        count: +mergedNumber,
      });
      return;
    }
    if (props.clickedOperator) {
      const calculated = calculate(props.count, +value, props.clickedOperator);
      render({
        ...props,
        count: calculated,
      });
    }
  };

  const onClickOperator = ({ target: { value } }) => {
    if (!props.count) {
      // eslint-disable-next-line no-alert
      alert('숫자를 먼저 입력해주세요');
      return;
    }
    if (value === '=') {
      const calculated = calculate(props.count, 0, value);
      render({
        ...props,
        count: calculated,
        clickedOperator: value,
      });
      return;
    }
    render({
      ...props,
      clickedOperator: value,
    });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <div>{props.count}</div>
      <div>
        {NUMBERS.map((number) => (
          <button
            type="button"
            name="number"
            value={number}
            onClick={onClickNumber}
          >
            {number}
          </button>
        ))}
      </div>
      <div>
        {OPERATORS.map((operator) => (
          <button type="button" name="operator" value={operator} onClick={onClickOperator}>
            {operator}
          </button>
        ))}
      </div>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render({ count: INIT_COUNT, clickedOperator: '', prevCount: 0 });
