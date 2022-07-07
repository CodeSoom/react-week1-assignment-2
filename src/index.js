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

const container = {
  operand1: 0,
  operand2: 0,
  temp: 0,
  operator: '',
  result: 0,
};

function calculator(operand1, operand2, operator) {
  const OPERATOR = {
    '+': operand1 + operand2,
    '-': operand1 - operand2,
    '*': operand1 * operand2,
    '/': operand1 / operand2,
    UNDEFINED: '해당 없음',
  };

  return OPERATOR[operator];
}

function handleClickNumber(number) {
  if (container.operator === '') {
    if (typeof container.operand1 === 'number') {
      container.temp = Number(
        container.operand1.toString() + number.toString(),
      );
      container.operand1 = container.temp;
      render(container.operand1);
    } else {
      container.operand1 = number;
      render(number);
    }
  } else if (typeof container.operand2 === 'number') {
    container.temp = Number(container.operand2.toString() + number.toString());
    container.operand2 = container.temp;
    render(container.operand2);
  } else {
    container.operand2 = number;
    render(number);
  }
}

function handleClickOperator(operator) {
  if (container.operator === '') {
    container.operator = operator;
  } else {
    const result = calculator(
      container.operand1,
      container.operand2,
      container.operator,
    );

    if (operator === '=') {
      render(result);
      container.operand1 = 0;
      container.operand2 = 0;
      container.operator = '';
    } else {
      render(result);
      container.operand1 = result;
      container.operand2 = 0;
      container.operator = operator;
    }
  }
}

function render(result = 0) {
  const element = (
    <div id="calculator">
      <p>간단 계산기</p>
      <p>{result}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button
            className="number"
            type="button"
            onClick={() => handleClickNumber(i)}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button
            className="operator"
            type="button"
            onClick={() => handleClickOperator(i)}
          >
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
