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

function render(result = 0, operand, operator) {
  function handleClickOperand(value) {
    if (operand) {
      render(result, Number(`${operand}${value}`).toString(), operator);
      return;
    }

    render(result, value, operator);
  }

  function handleClickPlus() {
    let newOperand = Number(operand);

    let newResult;

    if (operator === '+') {
      newResult = result + newOperand;
    } else {
      newResult = newOperand;
    }

    newOperand = '';

    render(newResult, newOperand, '+');
  }

  function handleClickEqual() {
    let newOperand = Number(operand);

    let newResult;

    if (operator === '+') {
      newResult = result + newOperand;
    } else {
      newResult = newOperand;
    }

    newOperand = '';

    render(newResult, newOperand, '=');
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{operand || result}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button
            type="button"
            onClick={() => handleClickOperand(i)}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        <button
          type="button"
          onClick={handleClickPlus}
        >
          +
        </button>
        <button type="button">-</button>
        <button type="button">*</button>
        <button type="button">/</button>
        <button
          type="button"
          onClick={handleClickEqual}
        >
          =
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
