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

let result = '';
let number = 0;
function calculator(i) {
  console.log(i);
  if (i === '=') {
    render(eval(result));
    result = '';
    number = 0;
  } else if (typeof (i) === 'string') {
    render(number);
    result += i;
    number = i;
  } else if (typeof (i) === 'number') {
    render(i);
    result += i;
    number = i;
  }
  console.log(result);
}

function render(count = 0) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const symbols = ['+', '-', '*', '-', '='];
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{count}</p>
      <p>
        {numbers.map((i) => (
          <button type="button" onClick={() => calculator(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {symbols.map((i) => (
          <button type="button" onClick={() => calculator(i)}>
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
