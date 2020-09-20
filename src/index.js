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
  '+': (num1, num2) => num1 + num2,
  '-': (num1, num2) => num1 - num2,
  '*': (num1, num2) => num1 * num2,
  '/': (num1, num2) => num1 / num2,
};

const concatNumbers = (origin, target) => (origin * 10) + target;

const getCalculationStep = (num1) => (operation) => (num2) => operation(num1, num2);

const sequenceOfButton = (upTo) => Array.from({ length: upTo }, (_, i) => i + 1);

function render(num1 = 0, calculate, startFlag = false) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {
          num1
        }
      </p>

      <div>
        {
          sequenceOfButton(9).map((i) => (
            <button
              type="button"
              onClick={() => (startFlag
                ? render(concatNumbers(0, i), calculate)
                : render(concatNumbers(num1, i), calculate))}
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
              onClick={() => (
                calculate
                  ? render(calculate(num1), getCalculationStep(calculate(num1))(value), true)
                  : render(num1, getCalculationStep(num1)(value), true)
              )}
            >
              {key}
            </button>
          ))
        }
        <button
          type="button"
          onClick={() => render(calculate(num1), undefined, true)}
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
