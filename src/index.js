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

let leftNumber = '';
let operator = '';
let rightNumber = '';

const calculate = (lft, opr, rgt) => {
  if (opr === '+') return lft + rgt;
  if (opr === '-') return lft - rgt;
  if (opr === '*') return lft * rgt;
  if (opr === '/') return lft / rgt;
  throw Error('dd');
};

function render(result = '') {
  const handleClickNumber = (num) => {
    if (typeof num !== 'number') return;
    if (operator === '') leftNumber += String(num);
    else rightNumber += String(num);
    render(rightNumber !== '' ? rightNumber : leftNumber);
  };

  const handleClickOperator = (opr) => {
    if (typeof opr !== 'string') return;
    if (leftNumber === '') return;
    if (rightNumber === '') operator = opr;
    else {
      leftNumber = calculate(Number(leftNumber), operator, Number(rightNumber));
      rightNumber = '';
      operator = opr;
    }
    render(rightNumber !== '' ? rightNumber : leftNumber);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{result}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button type="button" onClick={() => handleClickNumber(num)}>
            {num}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/'].map((opr) => (
          <button type="button" onClick={() => handleClickOperator(opr)}>
            {opr}
          </button>
        ))}
        <button type="button" onClick={() => render(calculate(Number(leftNumber), operator, Number(rightNumber)))}>
          =
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
