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

const concatNumbers = (origin, target) => (origin === 0 ? target : (origin * 10) + target);

const calculating = (num1) => (operation) => (num2) => operation(num1, num2);

const plus = (num1, num2) => num1 + num2;

const minus = (num1, num2) => num1 - num2;

const multiplication = (num1, num2) => num1 * num2;

const division = (num1, num2) => num1 / num2;

const symbolOfOperations = {
  '+': plus,
  '-': minus,
  '*': multiplication,
  '/': division,
};

const sequenceOfButton = (upTo) => Array.from({ length: upTo }, (_, i) => i + 1);

const handleNumberButton = (num1, operate, num2, i) => (operate === undefined
  ? [concatNumbers(num1, i)]
  : [num1, operate, concatNumbers(num2, i)]);

const calculate = (num1, operation, num2) => (operation !== undefined && num2 > 0
  ? operation(num2)
  : num1);

const handleOperationButton = (num1, operate, num2, operation) => [
  calculate(num1, operate, num2),
  calculating(calculate(num1, operate, num2))(operation),
  0,
];


function render(num1 = 0, operate, num2) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {
          operate !== undefined && num2 > 0 ? num2 : num1
        }
      </p>

      <div>
        {
          sequenceOfButton(9).map((i) => (
            <button
              type="button"
              onClick={() => (render(...handleNumberButton(num1, operate, num2, i)))}
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
              onClick={() => render(...handleOperationButton(num1, operate, num2, value))}
            >
              {key}
            </button>
          ))
        }
        <button
          type="button"
          onClick={() => render(operate(num2))}
        >
          =
        </button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
