/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension */
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

function render({ screenValue = 0 }) {
  const element = (
    <div>
      <div id="screen">{screenValue}</div>
      <br />
      <div id="digits">
        <button type="button">1</button>
        <button type="button">2</button>
        <button type="button">3</button>
        <button type="button">4</button>
        <button type="button">5</button>
        <button type="button">6</button>
        <button type="button">7</button>
        <button type="button">8</button>
        <button type="button">9</button>
      </div>
      <br />
      <div id="operations">
        <button type="button">+</button>
        <button type="button">-</button>
        <button type="button">*</button>
        <button type="button">/</button>
        <button type="button">=</button>
      </div>
    </div>
  );

  const $app = document.getElementById('app');

  $app.textContent = '';
  $app.appendChild(element);
}

render({ screenValue: 0 });
