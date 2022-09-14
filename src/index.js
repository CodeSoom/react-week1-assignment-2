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

const NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const OPERATOR = ['+', '-', '*', '/', '='];

function render(result) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <div>
        <p>{result}</p>
      </div>
      <div>
        {NUMBER.map((number) => (
          <button
            type="button"
            onClick={
              () => {
                render(number);
              }
            }
          >
            {number}
          </button>
        ))}
      </div>
      <div>
        {OPERATOR.map((operator) => (
          <button
            type="button"
            onClick={
              () => {
              }
            }
          >
            {operator}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0);
