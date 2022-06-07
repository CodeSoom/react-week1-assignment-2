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

  function getNewResultAndNewOperand() {
    let newOperand = Number(operand);

    let newResult;

    if (operator === '+') {
      newResult = result + newOperand;
    } else if (operator === '-') {
      newResult = result - newOperand;
    } else if (operator === '*') {
      newResult = result * newOperand;
    } else if (operator === '/') {
      newResult = result / newOperand;
    } else {
      newResult = newOperand;
    }

    newOperand = '';

    return [newResult, newOperand];
  }

  function handleClickPlus() {
    const [newResult, newOperand] = getNewResultAndNewOperand();

    render(newResult, newOperand, '+');
  }

  function handleClickMinus() {
    const [newResult, newOperand] = getNewResultAndNewOperand();

    render(newResult, newOperand, '-');
  }

  function handleClickMultiply() {
    const [newResult, newOperand] = getNewResultAndNewOperand();

    render(newResult, newOperand, '*');
  }

  function handleClickDivide() {
    const [newResult, newOperand] = getNewResultAndNewOperand();

    render(newResult, newOperand, '/');
  }

  function handleClickEqual() {
    const [newResult, newOperand] = getNewResultAndNewOperand();

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
        <button
          type="button"
          onClick={handleClickMinus}
        >
          -
        </button>
        <button
          type="button"
          onClick={handleClickMultiply}
        >
          *
        </button>
        <button
          type="button"
          onClick={handleClickDivide}
        >
          /
        </button>
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
