/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const OPERATORS = ['+', '-', '*', '/'];
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
  default:
    return a / b;
  }
}

function render(props) {
  const onClickNumber = ({ target: { value } }) => {
    if (!props.clickedOperator) {
      render({
        ...props,
        prevCount: Number(props.prevCount + value),
        result: Number(props.prevCount + value),
      });
      return;
    }
    render({
      ...props,
      currCount: Number(props.currCount + value),
      result: Number(props.currCount + value),
    });
  };

  const onClickOperator = ({ target: { value } }) => {
    if (props.prevCount && !props.currCount) {
      render({
        ...props,
        clickedOperator: value,
      });

      return;
    }

    if (props.prevCount && props.currCount) {
      const calculated = calculate(+props.prevCount, +props.currCount, props.clickedOperator);
      render({
        result: calculated,
        prevCount: calculated,
        currCount: 0,
        clickedOperator: value,
      });
    }
  };

  const onClickEqual = () => {
    render({
      ...props,
      result: calculate(+props.prevCount, +props.currCount, props.clickedOperator),
      prevCount: calculate(+props.prevCount, +props.currCount, props.clickedOperator),
      currCount: 0,
    });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <div>{props.result}</div>
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
        <button type="button" name="equal" value="equal" onClick={onClickEqual}>
          =
        </button>
      </div>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render({
  prevCount: INIT_COUNT, currCount: INIT_COUNT, clickedOperator: '', result: INIT_COUNT,
});
