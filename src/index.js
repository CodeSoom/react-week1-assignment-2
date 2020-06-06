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




function calculate(operator, calculation, current) {
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  }
  return operator === '=' ? current*1 : operators[operator](calculation*1, current*1)

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
              calculate(operator, calculation, index),
            )}              
          >
            {index}
          </button>
        ))}
      </p>
      <p>
        <button type="button" onClick={() => {operator !== '+' ? render(operator === '-' ? calculation*1 : current*1, true, '+', calculation*1) : render(calculation*1, true, '+', calculation*1)}}>+</button>
        <button type="button" onClick={() => {operator !== '-' ? render(current*1, true, '-', calculation*1) : render(calculation*1, true, '-', calculation*1)}}>-</button>
        <button type="button" onClick={() => {operator !== '*' ? render(current*1, true, '*', calculation*1) : render(calculation*1, true, '*', calculation*1)}}>*</button>
        <button type="button" onClick={() => {operator !== '/' ? render(current*1, true, '/', calculation*1) : render(calculation*1, true, '/', calculation*1)}}>/</button>
        <button type="button" onClick={() => {render(calculation*1, true, '=', 0)}}>=</button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
