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

function render(
  displayNumber = 0,
  bufferNumber = 0,
  bufferOperator = "+",
  isEditableNumber = false
) {
  const NUMBER_BUTTON_CONTENT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const OPERATE_BUTTON_CONTENT = ["+", "-", "*", "/", "="];

  function generateButtons(btnsArr, onClickHandler) {
    return btnsArr.map((i) => (
      <button type="button" onClick={() => onClickHandler(i)}>
        {i}
      </button>
    ));
  }

  function calculate(num1, num2, operator) {
    const calculation = {
      "+": num1 + num2,
      "-": num1 - num2,
      "*": num1 * num2,
      "/": num1 / num2,
    };

    return calculation[operator];
  }

  function handleClickNumber(number) {
    const displayNumberNew = isEditableNumber
      ? displayNumber * 10 + number
      : number;
    render(displayNumberNew, bufferNumber, bufferOperator, true);
  }

  function handleClickOperator(operator) {
    const bufferNumberNew = calculate(
      bufferNumber,
      displayNumber,
      bufferOperator
    );

    const displayBufferNumber = () =>
      render(bufferNumberNew, bufferNumberNew, operator, false);
    const displayBufferNumberAndReset = () =>
      render(bufferNumberNew, 0, "+", false);

    if (operator === "=") {
      displayBufferNumberAndReset();
      return;
    }
    displayBufferNumber();
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayNumber}</p>
      <p>{generateButtons(NUMBER_BUTTON_CONTENT, handleClickNumber)}</p>
      <p>{generateButtons(OPERATE_BUTTON_CONTENT, handleClickOperator)}</p>
    </div>
  );

  document.getElementById("app").textContent = "";
  document.getElementById("app").appendChild(element);
}

render();
