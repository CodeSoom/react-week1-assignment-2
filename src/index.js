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

const initState = {
  curNum: 0,
  prevNum: null,
  operatorFunction: null,
};

const operatorFunctions = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '=': null,
};

function render({ curNum, prevNum, operatorFunction }) {
  function handleClickNumber(value) {
    render({ curNum: curNum * 10 + value, prevNum, operatorFunction });
  }

  function handleClickOperator(operator) {
    if (operator === '=') {
      render({ curNum: null, prevNum: operatorFunction(prevNum, curNum), operatorFunction: null });
      return;
    }

    if (operatorFunction) {
      render({ curNum: null, prevNum: operatorFunction(prevNum, curNum), operatorFunction });
      return;
    }

    render({ curNum: null, prevNum: curNum, operatorFunction: operatorFunctions[operator] });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      {curNum ?? prevNum}
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((operator) => (
          <button type="button" onClick={() => handleClickOperator(operator)}>
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  const app = document.getElementById('app');

  app.textContent = '';
  app.appendChild(element);
}

render(initState);
