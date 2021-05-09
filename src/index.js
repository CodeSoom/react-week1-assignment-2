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
  const element = (
    <div>
      <p>간단 계산기</p>
      {nextValue}
      <br />
      <br />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
        <button
          type="button"
          onClick={(e) => {
            if (isClickedNumberBtn) {
              render({
                nextValue: parseInt(`${nextValue}${e.target.textContent.trim()}`, 10),
                prevValue,
                isClickedNumberBtn: true,
                clickedOperation,
              });
            } else {
              render({
                nextValue: parseInt(e.target.textContent.trim(), 10),
                prevValue,
                isClickedNumberBtn: true,
                clickedOperation,
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
            nextValue,
            prevValue: nextValue,
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
            nextValue,
            prevValue: nextValue,
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
            nextValue,
            prevValue: nextValue,
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
            nextValue,
            prevValue: nextValue,
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
          if (clickedOperation === '+') {
            render({
              nextValue: nextValue + prevValue,
              prevValue,
              isClickedNumberBtn: false,
              clickedOperation: '',
            });
          } else if (clickedOperation === '-') {
            render({
              nextValue: nextValue - prevValue,
              prevValue,
              isClickedNumberBtn: false,
              clickedOperation: '',
            });
          } else if (clickedOperation === '*') {
            render({
              nextValue: parseInt((nextValue * prevValue).toFixed(6), 10),
              prevValue,
              isClickedNumberBtn: false,
              clickedOperation: '',

            });
          } else if (clickedOperation === '/') {
            render({
              nextValue: parseInt((prevValue / nextValue).toFixed(6), 10),
              prevValue,
              isClickedNumberBtn: false,
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
