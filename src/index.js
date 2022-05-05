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

function calculate(oper, num1, num2) {
  switch (oper) {
  case '+':
    return num1 + num2;
  case '-':
    return num1 - num2;
  case '*':
    return num1 * num2;
  case '/':
    return num1 / num2;
  default:
    return num2 || num1;
  }
}

function render(num1 = 0, num2 = 0, operation) {
  function handleCalculator(e) {
    const oper = e.target.textContent;
    const result = calculate(operation, parseFloat(num1), parseFloat(num2));
    if (oper === '=') {
      render(result);
      return;
    }
    render(result, 0, oper);
  }

  function handleClickNumber(e) {
    const next = e.target.textContent;
    render(num1, `${!num2 ? next : num2 + next}`, operation);
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{num2 || num1}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => <button type="button" onClick={(e) => handleClickNumber(e)}>{i}</button>)}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => <button type="button" onClick={(e) => handleCalculator(e)}>{i}</button>)}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
