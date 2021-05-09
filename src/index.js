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

function render({
  nextValue, prevValue, isClickedNumberBtn, clickedOperation,
}) {
  const result = nextValue;
  const pressedNumber = prevValue;
  const isPressedNumberBtn = isClickedNumberBtn;
  const pressedOperation = clickedOperation;

  const element = (
    <div>
      <p>간단 계산기</p>
      {result}
      <br />
      <br />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
        <button
          type="button"
          onClick={(e) => {
            if (isPressedNumberBtn) {
              render({
                nextValue: parseInt(`${result}${e.target.textContent.trim()}`, 10),
                prevValue: pressedNumber,
                isClickedNumberBtn: true,
                clickedOperation: pressedOperation,
              });
            } else {
              render({
                nextValue: parseInt(e.target.textContent.trim(), 10),
                prevValue: pressedNumber,
                isClickedNumberBtn: true,
                clickedOperation: pressedOperation,
              });
            }
          }}
        >
          {number}
        </button>
      ))}
      <br />
      <br />
      <button
        type="button"
        onClick={() => {
          render({
            nextValue: result,
            prevValue: result,
            isClickedNumberBtn: false,
            clickedOperation: '+',
          });
        }}
      >
        +
      </button>
      <button
        type="button"
        onClick={() => {
          render({
            nextValue: result,
            prevValue: result,
            isClickedNumberBtn: false,
            clickedOperation: '-',
          });
        }}
      >
        -
      </button>
      <button
        type="button"
        onClick={() => {
          render({
            nextValue: result,
            prevValue: result,
            isClickedNumberBtn: false,
            clickedOperation: '*',
          });
        }}
      >
        *
      </button>
      <button
        type="button"
        onClick={() => {
          render({
            nextValue: result,
            prevValue: result,
            isClickedNumberBtn: false,
            clickedOperation: '/',
          });
        }}
      >
        /
      </button>
      <button
        type="button"
        onClick={() => {
          if (pressedOperation === '+') {
            render({
              nextValue: nextValue + prevValue,
              prevValue: pressedNumber,
              isClickedNumberBtn: true,
              clickedOperation: '',
            });
          } else if (pressedOperation === '-') {
            render({
              nextValue: nextValue - prevValue,
              prevValue: pressedNumber,
              isClickedNumberBtn: true,
              clickedOperation: '',
            });
          } else if (pressedOperation === '*') {
            render({
              nextValue: parseInt((nextValue * prevValue).toFixed(6), 10),
              prevValue: pressedNumber,
              isClickedNumberBtn: true,
              clickedOperation: '',

            });
          } else if (pressedOperation === '/') {
            render({
              nextValue: parseInt((prevValue / nextValue).toFixed(6), 10),
              prevValue: pressedNumber,
              isClickedNumberBtn: true,
              clickedOperation: '',
            });
          }
        }}
      >
        =
      </button>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  nextValue: 0,
  prevValue: 0,
  clickedOperation: '',
  isClickedNumberBtn: false,
});
