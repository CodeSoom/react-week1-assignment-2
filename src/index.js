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

let oldNum = 0;
let newNum = 0;
let operator = '';
let isOperating = false;

function render(num = 0) {
  function makeResult(oper) {
    let result;
    if (oper === '+') {
      result = oldNum + num;
    } else if (oper === '-') {
      result = oldNum - num;
    } else if (oper === '/') {
      result = oldNum / num;
    } else if (oper === '*') {
      result = oldNum * num;
    }
    oldNum = result;
    newNum = 0;
    render(result);
  }

  function handleClickNumber(value) {
    const display = document.getElementById('display');
    if (isOperating) {
      display.innerText = '';
      isOperating = false;
    }
    display.innerText += value;
    newNum = Number(display.innerText);
    render(newNum);
  }

  function handleClickOperator() {
    const {
      event: {
        target: { innerText },
      },
    } = this;
    if (operator === '') {
      operator = innerText;
      oldNum = newNum;
    } else {
      makeResult(operator);
      operator = innerText;
    }
    isOperating = true;
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="display">{num}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button type="button" onClick={() => handleClickOperator()}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
