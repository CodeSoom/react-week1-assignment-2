/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, num]) => {
    element[key.toLowerCase()] = num;
  });

  children.flat().forEach(child => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

let before = 0;
let after = 0;
let operator = "";
let opercheck = false;

function render(num = 0) {
  function calculate(oper) {
    let result;
    if (oper === "+") result = before + num;
    if (oper === "-") result = before - num;
    if (oper === "/") result = before / num;
    if (oper === "*") result = before * num;

    before = result;
    after = 0;
    render(result);
  }

  function handleClickNumber(num) {
    const display = document.getElementById("display");
    if (opercheck) {
      display.innerText = "";
      opercheck = false;
    }
    display.innerText += num;
    after = Number(display.innerText);
    render(after);
  }

  function handleClickOperator() {
    const {
      event: {
        after: { innerText }
      }
    } = this;
    if (operator === "") {
      operator = innerText;
      before = after;
    } else {
      calculate(operator);
      operator = innerText;
    }
    opercheck = true;
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="display">{num}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(i => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {["+", "-", "*", "/", "="].map(i => (
          <button type="button" onClick={() => handleClickOperator()}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById("app").textContent = "";
  document.getElementById("app").appendChild(element);
}

render();
