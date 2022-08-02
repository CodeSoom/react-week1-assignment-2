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

function render({ count = 0, prev_num = 0, last_operator = '' }) {
  function calculate(a, b, operator) {
    if (operator === '+') {
      render({ count: a + b, prev_num: a + b });
    } else if (operator === '-') {
      render({ count: a - b, prev_num: a - b });
    } else if (operator === '*') {
      render({ count: a * b, prev_num: a * b });
    } else if (operator === '/') {
      render({ count: a / b, prev_num: a / b });
    }
    return count;
  }

  function handleClickNumber(value) {
    if (count > Number.MAX_SAFE_INTEGER) {
      alert('더 큰 숫자는 표현이 불가합니다.');
      return;
    }

    if (!operatorClicked) {
      count = count.toString() + value.toString();
      render({ count: Number(count), prev_num: prev_num });
    } else {
      render({ count: value, prev_num: prev_num, last_operator });
    }

    operatorClicked = false;
  }

  function handleClickOperator(value) {
    if (value === '=') {
      console.log("=", last_operator);
      calculate(prev_num, count, last_operator);
    } else if (prev_num !== 0) {
      calculate(prev_num, count, value);
      prev_num = count;
    } else {
      last_operator = value;
      prev_num = count;
      count = 0;
    }

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

render({ count: 0, last_operator: '', prevNum: 0});
