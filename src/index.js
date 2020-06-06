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





function add(a, b) {
  return a + b
}

function minus(a, b) {
  console.log(a-b)
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  console.log(a)
  console.log(b)
  console.log(a/b)
  return a / b
}


function render(current = 0, reset = false, operator='=', calculation = '') {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{current}</p>
      <p>{calculation}</p>
      <p>
        {Array(10).fill(0).map((i, index) => (
          <button
            type="button"
            onClick={() => render(
              reset ? index : [current * 1 === 0 ? '' : current, index].join(''),
              false,
              operator,
              calculation,
            )}              
          >
            {index}
          </button>
        ))}
      </p>
      <p>
        <button type="button" onClick={() => {operator === '=' ? render(current*1, true, '+', current*1) : render(add(calculation*1, current*1), true, '+', add(calculation*1, current*1))}}>+</button>
        <button type="button" onClick={() => {operator === '=' ? render(current*1, true, '-', current*1) : render(minus(calculation*1, current*1), true, '-', minus(calculation*1, current*1))}}>-</button>
        <button type="button" onClick={() => {operator === '=' ? render(current*1, true, '*', current*1) : render(multiply(calculation*1, current*1), true, '*', multiply(calculation*1, current*1))}}>*</button>
        <button type="button" onClick={() => {operator === '=' ? render(current*1, true, '/', current*1) : render(divide(calculation*1, current*1), true, '/', divide(calculation*1, current*1))}}>/</button>
        <button type="button" onClick={() => {render(multiply(calculation*1, current*1), true, '=', 0)}}>=</button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
