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

const NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const OPERATOR = ['+', '-', '*', '/', '='];
const queue = [];

function isEmpty() {
  return queue.length === 0;
}

function enqueue(value) {
  queue[queue.length] = value;
}

function clear() {
  queue.splice(0, queue.length);
}

function calulation() {
  switch (queue[1]) {
  case '+':
    return queue[0] + queue[2];
  case '-':
    return queue[0] - queue[2];
  case '*':
    return queue[0] * queue[2];
  case '/':
    return queue[0] / queue[2];
  default:
    return 0;
  }
}

function render(result) {
  const root = document.getElementById('app');

  const element = (
    <div>
      <p>간단 계산기</p>
      <div>
        <p>{result}</p>
      </div>
      <div>
        {NUMBER.map((number) => (
          <button
            type="button"
            onClick={
              () => {
                const value = queue[queue.length - 1];
                if (isEmpty() || typeof value === 'string') {
                  enqueue(number);
                  render(number);
                } else {
                  const temp = parseInt(value.toString() + number.toString(), 10);
                  queue[queue.length - 1] = temp;
                  render(result.toString() + number.toString());
                }
              }
            }
          >
            {number}
          </button>
        ))}
      </div>
      <div>
        {OPERATOR.map((operator) => (
          <button
            type="button"
            onClick={
              () => {
                if (typeof queue[queue.length - 1] === 'string') {
                  return;
                }

                if (operator === '=' || queue.length === 3) {
                  const calulationResult = calulation();
                  render(calulationResult);
                  clear();
                  enqueue(calulationResult);
                }
                enqueue(operator);
              }
            }
          >
            {operator}
          </button>
        ))}
      </div>
    </div>
  );

  root.textContent = '';
  root.appendChild(element);
}

render(0);
