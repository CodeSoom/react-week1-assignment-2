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

function render(showValue = 0, resultValue = 0, prevOp = '+', reset = true) {
  function generateButtons(btnsArr, onClickHandler) {
    return btnsArr.map((i) => (
      <button type="button" onClick={() => onClickHandler(i)}>
        {i}
      </button>
    ));
  }

  function calculate(num1, num2, op) {
    switch (op) {
    case '+': return num1 + num2;
    case '-': return num1 - num2;
    case '*': return num1 * num2;
    case '/': return num1 / num2;
    default: throw new Error('ValueError');
    }
  }

  function handleClickNumberBnt(number) {
    if (reset) {
      render(number, resultValue, prevOp, false);
    } else {
      render(showValue * 10 + number, resultValue, prevOp, false);
    }
  }

  function handleClickOpBtn(op) {
    const result = calculate(resultValue, showValue, prevOp);

    if (op !== '=') {
      render(result, result, op, true);
    } else {
      render(result, 0, '+', true);
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{showValue}</p>
      <p>
        {generateButtons([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], handleClickNumberBnt)}
      </p>
      <p>
        {generateButtons(['+', '-', '*', '/', '='], handleClickOpBtn)}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
