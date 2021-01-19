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

const numbers = [];
let calculaedNumber = '';
let oprator = '';

let render;

function handleClickNumber(number) {
  calculaedNumber = calculaedNumber.concat(number);
  render(Number(calculaedNumber));
}
function handleClickOperator(count, clickedOperator) {
  numbers.push(count);
  calculaedNumber = '';

  let result = 0;

  if (numbers.length < 2) {
    oprator = clickedOperator;
    return;
  }

  switch (oprator) {
  case '+':
    result = numbers[0] + numbers[1];
    break;
  case '-':
    result = numbers[0] - numbers[1];
    break;
  case '*':
    result = numbers[0] * numbers[1];
    break;
  case '/':
    result = numbers[0] ? numbers[0] / numbers[1] : 0;
    break;
  default:
    break;
  }
  oprator = clickedOperator;
  numbers.length = 0;
  numbers.push(result);
  render(result);
}

render = (count) => {
  const element = (
    <div>
      <div id="displayArea" className="display">
        {count}
      </div>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button type="button" onClick={() => handleClickOperator(count, i)}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );
  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
};
render(0);
