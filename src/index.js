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

const operatorFunction = {
  '+': (x, y) => x + y,
};

function calculate(fistNumber, secondNumber, operator) {
  return operatorFunction[operator](fistNumber, secondNumber);
}

function render({ number, result, operator }) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const operators = ['+', '-', '*', '/'];

  function handleClickNumber(value) {
    render({
      number: number * 10 + value,
      result,
    });
  }

  function handleClickOperators(value) {
    render({
      number: calculate(number, result, operator),
      result,
      operator: value,
    });
  }

  const element = (
    <div>
      <p>{number}</p>
      <p>{result}</p>
      <p>
        {numbers.map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {operators.map((i) => (
          <button type="button" onClick={() => handleClickOperators(i)}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  number: 0,
  result: 0,
  operator: '',
});
