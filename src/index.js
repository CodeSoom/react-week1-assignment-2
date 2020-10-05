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

const symbolOfOperations = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

const concatNumbers = (origin, target) => (origin * 10) + target;

const operate = (num1) => (operation) => (num2) => operation(num1, num2);

const sequence = (upTo) => Array.from({ length: upTo }, (_, i) => i + 1);

function render({ number, calculate, numberResetFlag }) {
  function handleNumberButtonClick(i) {
    render({
      number: concatNumbers((numberResetFlag ? 0 : number), i),
      calculate,
      numberResetFlag: false,
    });
  }

  function handleOperationButtonClick(operation) {
    const nextNumber = calculate ? calculate(number) : number;
    render({
      number: nextNumber,
      calculate: operate(nextNumber)(operation),
      numberResetFlag: true,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number}</p>

      <div>
        {
          sequence(9).map((i) => (
            <button
              type="button"
              onClick={() => handleNumberButtonClick(i)}
            >
              { i }
            </button>
          ))
        }
      </div>

      <div>
        {
          Object.entries(symbolOfOperations).map(([key, value]) => (
            <button
              type="button"
              onClick={() => handleOperationButtonClick(value)}
            >
              {key}
            </button>
          ))
        }
        <button
          type="button"
          onClick={() => render({
            number: calculate(number),
            undefined,
            numberResetFlag: true,
          })}
        >
          =
        </button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  number: 0,
  calculate: undefined,
  numberResetFlag: false,
});
