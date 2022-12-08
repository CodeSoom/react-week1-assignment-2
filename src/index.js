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

function render(acc, cur = 0, operator = '') {
  function insertNumber(number) {
    if (operator === '+') {
      render(acc + number, number);
    } else if (operator === '-') {
      render(acc - number, number);
    } else if (operator === '/') {
      render(acc / number, number);
    } else if (operator === '*') {
      render(acc * number, number);
    } else if (acc === 0) {
      render(acc + number, 0);
    } else {
      render(parseInt(acc + number.toString(), 10));
    }
  }
  function insertOperator(oper) {
    if (oper === '=') {
      render(0, acc);
    } else {
      render(acc, 0, oper);
    }
  }
  const element = (
    <div>
      <p>간단 계산기</p>
      {(cur || acc)}
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => insertNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button type="button" onClick={() => insertOperator(i)}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0);
