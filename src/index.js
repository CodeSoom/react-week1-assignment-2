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

const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const signList = ['+', '-', '*', '/'];

function render({ left, right, pSign }) {
  const maths = {
    '': (leftnum, rightnum) => rightnum || leftnum,
    '+': (leftnum, rightnum) => leftnum + rightnum,
    '-': (leftnum, rightnum) => leftnum - rightnum,
    '*': (leftnum, rightnum) => leftnum * rightnum,
    '/': (leftnum, rightnum) => leftnum / rightnum,
  };
  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="result">
        {
          right === 0
            ? left
            : right
        }
      </p>
      <p>
        {

          numberList.map((clickedNumber) => (
            <button
              type="button"
              onClick={() => (pSign === ''
                ? render({ left: left * 10 + clickedNumber, right, pSign })
                : render({ left, right: right * 10 + clickedNumber, pSign }))}
            >
              {clickedNumber}
            </button>
          ))
        }
      </p>
      <p>
        {
          signList.map((sign) => (
            <button
              type="button"
              onClick={() => render({ left: maths[pSign](left, right), right: 0, pSign: sign })}
            >
              {sign}
            </button>
          ))
        }
        <button
          type="button"
          onClick={() => render({ left: maths[pSign](left, right), right: 0, pSign: '!' })}
        >
          =
        </button>
      </p>

    </div>
  );
  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  left: 0,
  right: 0,
  pSign: '',
});
