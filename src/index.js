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

//

const initNum = 0;
const digits = [];
const inputs = [];

function calculate() {
  switch (inputs[1]) {
  case '+':
    return inputs[0] + inputs[2];
  case '-':
    return inputs[0] - inputs[2];
  case '*':
    return inputs[0] * inputs[2];
  case '/':
    return inputs[0] / inputs[2];
  default:
    break;
  }
  return 0;
}

// 객체로 만들기?
function render(numForScreen) {
  function handleClickNumber(num) {
    digits.push(num);
    render(parseInt(digits.join(''), 10));
  }

  function handleClickOperator(opr) {
    if (digits.length === 0) {
      inputs.splice(-1, 1, opr);
      return;
    }
    inputs.push(parseInt(digits.join(''), 10));
    inputs.push(opr);
    digits.splice(0);

    if (opr === '=' && inputs.length === 2) {
      render(inputs[0]);
      inputs.splice(0);
    } else if (opr === '=' && inputs.length > 3) {
      const result = calculate();
      render(result);
      inputs.splice(0);
    } else if (inputs.length > 3) {
      const result = calculate();
      inputs.splice(0, 3, result);
      render(result);
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <span id="screen">{numForScreen}</span>
      <div id="numButtons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button type="button" onClick={() => handleClickNumber(num)}>
            {num}
          </button>
        ))}
      </div>
      <div id="oprButtons">
        {['+', '-', '*', '/', '='].map((opr) => (
          <button type="button" onClick={() => handleClickOperator(opr)}>
            {opr}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initNum);
