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

function render({ leftNumber, rightNumber, paraSign }) {
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
        {rightNumber || leftNumber}
      </p>
      <p>
        { numberList.map((clickedNumber) => (
          <button
            type="button"
            onClick={() => (paraSign === ''
              ? render({ leftNumber: leftNumber * 10 + clickedNumber, rightNumber, paraSign })
              : render({ leftNumber, rightNumber: rightNumber * 10 + clickedNumber, paraSign }))}
          >
            {clickedNumber}
          </button>
        ))}
      </p>
      <p>
        {signList.map((clickedsign) => (
          <button
            type="button"
            onClick={() => render({
              leftNumber: maths[paraSign](leftNumber, rightNumber),
              rightNumber: 0,
              paraSign: clickedsign,
            })}
          >
            {clickedsign}
          </button>
        ))}
        <button
          type="button"
          onClick={() => render({
            leftNumber: maths[paraSign](leftNumber, rightNumber),
            rightNumber: 0,
            paraSign,
          })}
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
  leftNumber: 0,
  rightNumber: 0,
  paraSign: '',
});
