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

function handleClickNumber(previousNumber, afterNumber) {
  if (previousNumber === 0) {
    render(afterNumber);
    return;
  }

  // 두개의 숫자를 합치기
  render(previousNumber + String(afterNumber));
}

function handleClickOperator() {}

function render(number = 0) {
  const element = (
    <div>
      <p>간단 계산기</p>
      {number}
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(number, i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((o) => (
          <button type="button" onClick={() => handleClickOperator(o)}>
            {o}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
