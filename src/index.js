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
  preNumber, currentNumber, savedOpertaor,
}) {
  function calculator(pre, next) {
    return {
      '+': pre + next,
      '-': pre - next,
      '*': pre * next,
      '/': pre / next,
    };
  }

  function handleClickNumber(number) {
    if (!savedOpertaor) {
      const value = currentNumber * 10 + number;

      render({
        preNumber: value, currentNumber: value, savedOpertaor,
      });

      return;
    }
    const result = calculator(preNumber, number)[savedOpertaor];
    render({
      preNumber: result, currentNumber: result, savedOpertaor: null,
    });
  }

  function handleClickOperator(operator) {
    render({
      preNumber, currentNumber, savedOpertaor: operator,
    });
  }

  const calculatorElement = (
    <div>
      <div>
        <p>간단 계산기</p>
      </div>
      <p>{currentNumber}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button type="button" onClick={() => handleClickNumber(number)}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((operator) => (
          <button type="button" onClick={() => handleClickOperator(operator)}>
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(calculatorElement);
}

render({
  preNumber: 0, currentNumber: 0, savedOpertaor: null,
});
