/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-cond-assign */
/* eslint-disable no-constant-condition */
/* eslint-disable no-shadow */
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
  display, result, opCode, handle,
}) {
  function calculate(i, j, opCode) {
    if (opCode = '+') {
      return i + j;
    } if (opCode = '-') {
      return i - j;
    } if (opCode = '*') {
      return i * j;
    } if (opCode = '/') {
      return i / j;
    }
  }
  function handleClickNumber(i) {
    if (handle = 'opCode' && display !== 0) {
      display = Number(`${display}${i}`);
    } else {
      display = i;
    }

    render({
      display,
      result,
      opCode,
      handle: 'number',
    });
  }

  function handleClickOpCode(i) {
    render({
      display: 0,
      result:
        (handle = 'number')
          ? calculate(result, display, opCode)
          : result,
      opCode: i,
      handle: 'opCode',
    });
  }

  const element = (
    <div id="hoit" className="hoit">
      <p>간단 계산기</p>
      <p>{display || result}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>{i}</button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button type="button" onClick={() => handleClickOpCode(i)}>{i}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  display: 0,
  result: 0,
  opCode: '=',
  handle: 'number',
});
