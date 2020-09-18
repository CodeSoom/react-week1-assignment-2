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

const symbolOfOperations = ['+', '-', '*', '/', '='];

const numberButtonClick = (clickedNumber, beforeNumber) => (
  beforeNumber === 0 ? clickedNumber : `${beforeNumber}${clickedNumber}`
);


function render(num = 0) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        result :
        {
          num
        }
      </p>

      <div>
        {
          Array.from({ length: 9 }).map((_, i) => (
            <button type="button" onClick={() => render(numberButtonClick(i + 1, num))}>{ i + 1}</button>
          ))
        }
      </div>

      <div>
        {
          symbolOfOperations.map((v) => (
            <button type="button">{v}</button>
          ))
        }
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
