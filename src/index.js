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

function render(display, calculator) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = [
    { label: '+', func: (number1) => (number2) => number1 + number2 },
    { label: '-', func: (number1) => (number2) => number1 - number2 },
    { label: '*', func: (number1) => (number2) => number1 * number2 },
    { label: '/', func: (number1) => (number2) => number1 / number2 },
    { label: '=', func: () => null },
  ];

  const handleNumberClick = (number) => {
    if (display === 0 && !calculator) {
      render(number);
      return;
    }

    if (calculator && typeof calculator === 'function') {
      const isFirstOperation = typeof calculator(display) === 'function';
      if (isFirstOperation) {
        render(number, calculator(display));
        return;
      }

      const isEqualOperation = calculator() === null;
      if (isEqualOperation) {
        render(number);
        return;
      }

      render(+`${display}${number}`, calculator);
      return;
    }

    render(+`${display}${number}`);
  };

  const handleOperatorClick = (func) => {
    if (calculator && typeof calculator === 'function') {
      render(calculator(display), func);
      return;
    }

    render(display, func);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{display}</p>
      <p>
        {numbers.map((number) => (
          <button
            type="button"
            onClick={() => handleNumberClick(number)}
          >
            {number}
          </button>
        ))}
      </p>
      <p>
        {operators.map(({ label, func }) => (
          <button
            type="button"
            onClick={() => handleOperatorClick(func)}
          >
            {label}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0);
