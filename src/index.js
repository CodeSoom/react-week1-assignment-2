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

function calculate(oper, x, y) {
  switch (oper) {
  case '+':
    return x + y;
  case '-':
    return x - y;
  case '*':
    return x * y;
  case '/':
    return x / y;
  default:
    return x || y;
  }
}

function render(x = 0, y = 0, operation) {
  function handleCalculator(e) {
    const nextOperation = e.target.textContent;
    const result = calculate(operation, parseFloat(x), parseFloat(y));
    if (nextOperation === '=') {
      render(result);
      return;
    }
    render(result, 0, nextOperation);
  }

  function handleClickNumber(e) {
    const next = e.target.textContent;
    render(x, `${!y ? next : y + next}`, operation);
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{y || x}</p>
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
