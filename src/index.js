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

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ['+', '-', '*', '/', '='];

const initialState = {
  number: 0,
  temporary: 0,
  operator: '',
};

const calculation = (operator, a, b) => {
  switch (operator) {
  case '+':
    return (a + b);
  case '-':
    return (a - b);
  case '*':
    return (a * b);
  case '/':
    return (a / b);
  default:
    return (a || b);
  }
};

function render(value = initialState) {
  const { number, temporary, operator } = value;

  const numberClick = (num) => {
    render({ ...value, number: number * 10 + num });
  };

  const operatorClick = (opera) => {
    render({ number: 0, temporary: calculation(operator, temporary, number), operator: opera });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{ number || temporary }</p>
      <p>
        {numbers.map((num) => (
          <button type="button" onClick={() => numberClick(num)}>
            {num}
          </button>
        ))}
      </p>
      <p>
        {operators.map((opera) => (
          <button type="button" onClick={() => operatorClick(opera)}>
            {opera}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
