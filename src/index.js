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

const numbers = { screen: 0, preNumber: '', constats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] };
const marks = { selected: '', count: ['+', '-', '*', '/', '='] };

function handleClickNumber(value) {
  if (numbers.screen === 0) {
    numbers.screen = value;
  } else {
    numbers.screen = `${numbers.screen}${value}`;
  }
  render();
}

function handleClickMark(value) {
  marks.selected = value;
  numbers.preNumber = numbers.screen;
  numbers.screen = 0;
  // console.log(marks.selected);
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
        {marks.count.map((i) => (
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
