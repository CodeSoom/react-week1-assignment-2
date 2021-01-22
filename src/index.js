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

function render(result = 0) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const operators = ['+', '-', '*', '/'];

  function handleClickNumber(number) {
    render(result * 10 + number);
  }

  function handleClickOperators() {
    render();
  }


  const element = (
    <div>
      <p>{result}</p>
      <p>
        {numbers.map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {operators.map((i) => (
          <button type="button" onClick={() => handleClickOperators(i)}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
