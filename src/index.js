/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const app = document.getElementById('app');
const operators = ['+', '-', '*', '/', '='];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

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

function render(result = 0) {
  function isNumber(value) {
    return typeof (value) === 'number';
  }

  function handleClick(value) {
    if (isNumber(result) && isNumber(value)) {
      render(parseInt(`${result}${value}`, 10));
      return;
    }
    render(value);
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{result}</p>
      <p>
        {numbers.map((i) => (
          <button type="button" onClick={() => { handleClick(i); }}>{i}</button>
        ))}
      </p>
      <p>
        {operators.map((i) => (
          <button type="button" onClick={() => { handleClick(i); }}>{i}</button>
        ))}
      </p>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render();
