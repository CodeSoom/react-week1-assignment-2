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

function render(state = 0) {
  const value = state;

  const element = (
    <div>
      <p>간단 계산기</p>
      {value}
      <br />
      <br />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
        <button
          type="button"
          onClick={(e) => {
            render(parseInt(e.target.textContent.trim(), 10));
          }}
        >
          {number}
        </button>
      ))}
      <br />
      <br />
      <button type="button">+</button>
      <button type="button">-</button>
      <button type="button">*</button>
      <button type="button">/</button>
      <button type="button">=</button>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
