/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
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

// 계산기하면 역시 stack인데...그걸로 했어야 되나
// 일단 제출하고 리팩토링하자 어렵다 어려워 잘 좀하자

function render() {
  const number = [];
  const operator = [];
  let result = 0;

  function handleNumber(num) {
    number.push(num);
  }

  function handleOperator(oper) {
    if (oper === "=") {
      if (operator.pop() === "+") {
        const num1 = number.pop();
        const num2 = number.pop();
        result = num1 + num2;
      } else if (operator.pop === "-") {
        const num1 = number.pop();
        const num2 = number.pop();
        result = num1 - num2;
      } else if (operator.pop() === "*") {
        const num1 = number.pop();
        const num2 = number.pop();
        result = num1 * num2;
      } else if (operator.pop() === "/") {
        const num1 = number.pop();
        const num2 = number.pop();
        result = num1 / num2;
      }

      console.log(result);
    } else {
      operator.push(oper);
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button type="button" onClick={() => handleNumber(num)}>
            {num}
          </button>
        ))}
      </p>
      <p>
        {["+", "-", "*", "/", "="].map(oper => (
          <button type="button" onClick={() => handleOperator(oper)}>
            {oper}
          </button>
        ))}
      </p>
      <p>{result}</p>
    </div>
  );

  const app = document.getElementById("app");

  app.textContent = "";
  app.appendChild(element);
}

render();
