/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* eslint linebreak-style: ["error", "windows"] */

/* @jsx createElement */

const app = document.getElementById('app');

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

function render({
  result = 0, operator = '', prevNum = 0, hasValue = false,
} = {}) {
  function handleNumClick(value) {
    if (!hasValue) {
      render({
        result: value,
        operator,
        prevNum: result,
        hasValue: true,
      });
    } else {
      render({
        result: Number(result.toString() + value.toString()),
        operator,
        prevNum,
        hasValue,
      });
    }
  }

  function handleCalculate(current, prev, sign) {
    switch (sign) {
    case '+':
      return prev + current;
    case '-':
      return prev - current;
    case '*':
      return prev * current;
    case '/':
      return prev / current;
    default:
      return '';
    }
  }

  function handleSignClick(sign) {
    if (sign === '=') {
      // operator: =
      render({
        result: handleCalculate(result, prevNum, operator),
        operator: '',
        prevNum: result,
        hasValue: false,
      });
    } else if (operator !== '') {
      // operator: + , - , * , /
      render({
        result: handleCalculate(result, prevNum, operator),
        operator: sign,
        prevNum: result,
        hasValue: false,
      });
    } else {
      // operator: ''
      render({
        result,
        operator: sign,
        prevNum: result,
        hasValue: false,
      });
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {result}
      </p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleNumClick(i)}>{i}</button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((s) => (
          <button type="button" onClick={() => handleSignClick(s)}>{s}</button>
        ))}
      </p>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render({
  result: 0, operator: '', prevNum: 0, hasValue: false,
});
