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

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const BASIC_OPERATORS = ['+', '-', '*', '/'];

const basicOperations = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};


function render({
  displayNumber, bufferNumber, bufferOperator, isEditableNumber,
}) {
  function handleClickNumber(number) {
    const displayNumberNew = isEditableNumber ? displayNumber * 10 + number : number;
    render({
      displayNumber: displayNumberNew,
      bufferNumber,
      bufferOperator,
      isEditableNumber: true,
    });
  }

  function calculate(x, y, operator) {
    return basicOperations[operator](x, y);
  }

  function handleClickBasicOperator(operator) {
    const bufferNumberNew = calculate(bufferNumber, displayNumber, bufferOperator);

    render({
      displayNumber: bufferNumberNew,
      bufferNumber: bufferNumberNew,
      bufferOperator: operator,
      isEditableNumber: false,
    });
  }

  function handleClickEqualOperator() {
    const bufferNumberNew = calculate(bufferNumber, displayNumber, bufferOperator);

    render({
      displayNumber: bufferNumberNew,
      bufferNumber: 0,
      bufferOperator: '+',
      isEditableNumber: false,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayNumber}</p>
      <p>
        {NUMBERS.map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {BASIC_OPERATORS.map((i) => (
          <button type="button" onClick={() => handleClickBasicOperator(i)}>
            {i}
          </button>
        ))}
        <button type="button" onClick={() => handleClickEqualOperator()}>
          =
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  displayNumber: 0,
  bufferNumber: 0,
  bufferOperator: '+',
  isEditableNumber: false,
});
