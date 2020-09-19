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
  const NUMBER_BUTTON_CONTENT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const OPERATE_BUTTON_CONTENT = ['+', '-', '*', '/', '='];

  function generateButtons(btnsArr, onClickHandler) {
    return btnsArr.map((i) => (
      <button type="button" onClick={() => onClickHandler(i)}>
        {i}
      </button>
    ));
  }

  function calculate(num1, num2, op) {
    const calculation = {
      '+': num1 + num2,
      '-': num1 - num2,
      '*': num1 * num2,
      '/': num1 / num2,
    };

    return calculation[op];
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
        {generateButtons(NUMBER_BUTTON_CONTENT, handleClickNumberBnt)}
      </p>
      <p>
        {generateButtons(OPERATE_BUTTON_CONTENT, handleClickOpBtn)}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
