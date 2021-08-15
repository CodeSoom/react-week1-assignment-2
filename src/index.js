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

function render({
  leftNumber, rightNumber, operator, result,
}) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };

  function handleClickNumber(number) {
    if (operator) {
      render({
        leftNumber,
        rightNumber: rightNumber * 10 + number,
        operator,
        result: rightNumber * 10 + number,
      });
      return;
    }

    render({
      leftNumber: leftNumber * 10 + number,
      rightNumber,
      operator,
      result: leftNumber * 10 + number,
    });
  }

  function handleClickOperator(pattern) {
    if (!operator || (operator && !rightNumber)) {
      render({
        leftNumber, rightNumber, operator: pattern, result,
      });
      return;
    }

    render({
      leftNumber: operators[operator](leftNumber, rightNumber),
      rightNumber: 0,
      operator: pattern,
      result: operators[operator](leftNumber, rightNumber),
    });
  }

  function handleClickEqual() {
    render({
      leftNumber: 0,
      rightNumber: 0,
      operator: null,
      result: operators[operator](leftNumber, rightNumber),
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {result}
      </p>
      <p>
        {numbers.map((number) => (
          <button type="button" onClick={() => handleClickNumber(number)}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {Object.keys(operators).map((pattern) => (
          <button type="button" onClick={() => handleClickOperator(pattern)}>
            {pattern}
          </button>
        ))}
        <button type="button" onClick={() => handleClickEqual()}>
          =
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  leftNumber: 0, rightNumber: 0, operator: null, result: 0,
});
