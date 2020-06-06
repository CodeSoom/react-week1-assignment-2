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

function calculate(operator) {
  const operators = {
    '+' : (a, b) => a + b,
    '-' : (a, b) => a - b,
    '*' : (a, b) => a * b,
    '/' : (a, b) => a / b,
  }
  return render(operators[operator[1]](operator[0]*1,operator[2]*1), 0, '')
}

function render(number = 0, next = 0, cal = '') {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number}</p>
      <p>
        {Array(10).fill(0).map((i, index) => (
          <button
            type="button"
            onClick={() => render(
              next === index ? number * 1 + index : [number * 1 === 0 ? '' : number, index].join(''),
              index, 
              [...cal]
            )}
          >
            {index}
          </button>
        ))}
      </p>
      <p>
        <button type="button" onClick={() => {cal = [...cal, number, '+']; number = 0;}}>+</button>
        <button type="button" onClick={() => {cal = [...cal, number, '-']; number = 0;}}>-</button>
        <button type="button" onClick={() => {cal = [...cal, number, '*']; number = 0;}}>*</button>
        <button type="button" onClick={() => {cal = [...cal, number, '/']; number = 0;}}>/</button>
        <button type="button" onClick={() => calculate([...cal, number])}>=</button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
