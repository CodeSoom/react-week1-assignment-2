/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const app = document.getElementById('app');
const operators = ['+', '-', '*', '/', '='];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const calculate = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
  '': (x, y) => x,
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

function render({
  showNumber, accumulator, number, operator,
}) {
  function isNumber(value) {
    return typeof (value) === 'number';
  }

  function handleClick(value) {
    /* 숫자 연속 입력 처리 */
    if (isNumber(number || 0) && isNumber(value || 0)) {
      render({
        showNumber: number * 10 + value,
        accumulator: number * 10 + value,
        number: number * 10 + value,
        operator,
      });
      return;
    }

    /* 숫자 클릭한 경우 */
    if (isNumber(value || 0) && !operator) {
      render(value, value, value, operator);
    } else if (isNumber(value || 0) && operator) {
      render({
        showNumber: value,
        accumulator,
        number: value,
        operator,
      });
      return;
    }

    /* = 클릭한 경우 */
    if (value === '=' && operator) {
      render({
        showNumber: calculate[operator](accumulator, number),
        accumulator: calculate[operator](accumulator, number),
        number: value,
      });
    } else if (value === '=') {
      render({
        showNumber,
        accumulator,
        number: value,
        operator,
      });
      return;
    }

    /* 연산자 클릭한 경우 */
    if (!isNumber(value)) {
      render({
        showNumber: calculate[operator](accumulator, number),
        accumulator: calculate[operator](accumulator, number),
        number: value,
        operator: value,
      });
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{showNumber}</p>
      <p>
        {numbers.map((i) => (
          <button type="button" onClick={() => handleClick(i)}>{i}</button>
        ))}
      </p>
      <p>
        {operators.map((i) => (
          <button type="button" onClick={() => handleClick(i)}>{i}</button>
        ))}
      </p>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render({
  showNumber: 0,
  accumulator: 0,
  number: '',
  operator: '',
});
