/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* eslint-disable no-use-before-define */

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

const numbers = { screen: '', bucket: [], constats: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] };
const marks = ['+', '-', '*', '/', '='];

function handleClickNumber(value) {
  numbers.screen += value;
  render();
}

function handleClickMark(value) {

}

function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{numbers.screen}</p>
      <p>
        {numbers.constats.map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {marks.map((i) => (
          <button type="button" onClick={() => handleClickMark(i)}>
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
