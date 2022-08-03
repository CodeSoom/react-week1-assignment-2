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

let operatorClicked = false;

function render({ count = 0, prevNum = 0, lastOperator = '' }) {
  function calculate(a, b, operator) {
    if (operator === '+') {
      return [a + b, a + b];
    }
    if (operator === '-') {
      return [a - b, a - b];
    }
    if (operator === '*') {
      return [a * b, a * b];
    }
    if (operator === '/') {
      return [a / b, a / b];
    }

    return [0, 0];
  }

  function handleClickNumber(value) {
    if (count > Number.MAX_SAFE_INTEGER) {
      render({ count: 0, prevNum: 0, lastOperator: '' });
      return;
    }

    if (!operatorClicked) {
      render({ count: Number(count.toString() + value.toString()), prevNum, lastOperator });
      return;
    }

    render({ count: value, prevNum, lastOperator });
    operatorClicked = false;
  }

  function handleClickOperator(value) {
    if (value === '=') {
      [count, prevNum] = calculate(prevNum, count, lastOperator);
      render({ count, prevNum, lastOperator });
      return;
    }

    if (lastOperator) {
      [count, prevNum] = calculate(prevNum, count, lastOperator);
      render({ count, prevNum: count, lastOperator: value });
    }

    lastOperator = value;
    prevNum = count;
    count = 0;

    operatorClicked = true;
  }

  const element = (
    <div>
      <p>간단 계산기</p>

      <p>
        {count}
      </p>

      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button type="button" onClick={() => handleClickOperator(i)}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ count: 0, prevNum: 0, lastOperator: '' });
