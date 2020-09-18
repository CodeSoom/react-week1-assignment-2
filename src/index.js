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

const makeNumberUsingClickedNumber = (clickedNumber, beforeNumber) => Number(beforeNumber === 0 ? clickedNumber : `${beforeNumber}${clickedNumber}`);

const calculating = (num1) => (operation) => (num2) => operation(num1, num2);

const plus = (num1, num2) => num1 + num2;

const minus = (num1, num2) => num1 - num2;

const multiplication = (num1, num2) => num1 * num2;

const division = (num1, num2) => num1 / num2;

const result = (num1, operation, num2) => (operation !== undefined && num2 > 0
  ? operation(num2) : num1);

const symbolOfOperations = {
  '+': plus,
  '-': minus,
  '*': multiplication,
  '/': division,
};

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
          Array.from({ length: 9 }).map((_, i) => (
            <button
              type="button"
              onClick={() => (operate === undefined
                ? render(makeNumberUsingClickedNumber(i + 1, num1))
                : render(num1, operate, makeNumberUsingClickedNumber(i + 1, num2)))}
            >
              { i + 1}
            </button>
          ))
        }
      </div>

      <div>
        {
          Object.entries(symbolOfOperations).map(([key, value]) => (
            <button
              type="button"
              onClick={() => {
                render(
                  result(num1, operate, num2),
                  calculating(result(num1, operate, num2))(value), 0,
                );
              }}
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
