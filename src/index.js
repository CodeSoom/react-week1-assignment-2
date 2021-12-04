/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

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

function render(newer = 0, older = 0, o2 = 0, operator = '') {
  const newO1 = newer + older * 10;
  const newO2 = o2;
  function handleClick(e) {
    const value = parseInt(e.target.innerText, 10) || e.target.innerText;
    if (typeof value === 'number') {
      render(value, newO1, newO2, operator);
    } else if (['+', '-', '*', '/'].includes(value)) {
      render(0, 0, newO1, value);
    } else if (['='].includes(value)) {
      if (operator === '+') {
        render(newO1 + newO2, 0);
      } else if (operator === '-') {
        render(newO2 - newO1, 0);
      } else if (operator === '*') {
        render(newO1 * newO2, 0);
      } else if (operator === '/') {
        render(newO2 / newO1, 0);
      }
    }
  }
  function buttonMaker(arr) {
    return (
      <p>
        {arr.map((value) => (
          <button type="button" onClick={handleClick}>
            {value}
          </button>
        ))}
      </p>
    );
  }

  const element = (
    <div>
      <div>
        {newO1}
      </div>
      <div>
        {buttonMaker([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])}
        {buttonMaker(['+', '-', '*', '/', '='])}
      </div>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render();
