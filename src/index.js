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

let pre = 0;
let cur = 0;
let op = '';
let acc = null;

function render(count) {
  function handleNumberClick(val) {
    if (op === '') {
      cur = (cur * 10) + val;
      return render(cur);
    }
    cur = (cur * 10) + val;
    return render(cur);
  }
  function calculation(operation) {
    if (operation === '+') {
      acc = (acc === null) ? (pre + cur) : (acc + cur);
    } else if (operation === '-') {
      acc = (acc === null) ? (pre - cur) : (acc - cur);
    } else if (operation === '*') {
      acc = (acc === null) ? (pre * cur) : (acc * cur);
    } else if (operation === '/') {
      acc = (acc === null) ? (pre / cur) : (acc / cur);
    }
    return acc;
  }
  function handleFourArithmeticOperatorClick(oper) {
    if (op !== '') {
      acc = calculation(op);
      op = oper;
      cur = 0;
      return render(acc);
    }
    pre = cur;
    op = oper;
    cur = 0;
    return render(count);
  }
  function handleEqualOperatorClick() {
    acc = calculation(op);
    op = null;
    pre = 0;
    cur = 0;
    return render(acc);
  }
  const element = (
    <div>
      <p>간단 계산기</p>

      <p>{count}</p>
      <p>
        {[...Array(10)].map((_, number) => (
          <button type="button" onClick={() => handleNumberClick((number))}>{number}</button>
        ))}
      </p>
      {['+', '-', '*', '/', '='].map((operator) => (
        <button
          type="button"
          onClick={() => {
            if (operator === '=') {
              return handleEqualOperatorClick();
            }
            return handleFourArithmeticOperatorClick(operator);
          }}
        >
          {operator}
        </button>
      ))}
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0);
