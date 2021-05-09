/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ['+', '-', '*', '/', '='];

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

const initState = {
  result: 0,
  num1: '',
  operator: '',
  num2: '',
};

function render(resultState) {
  const calculate = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };

  const calculator = ({ num1, operator, num2 }, item) => {
    const result = calculate[operator](Number(num1), Number(num2));

    render({
      result,
      num1: (item ? result : ''),
      operator: item || '',
      num2: '',
    });
  };

  const handleClickNumber = (number, {
    result, num1, operator, num2,
  }) => {
    const leftNumber = num1 + (operator === '' ? number : '');
    const rightNumber = num2 + (operator === '' ? '' : number);

    render({
      result,
      num1: leftNumber,
      operator,
      num2: rightNumber,
    });
  };

  const handleClickOperator = (operator, state) => {
    if (operator === '=') {
      calculator(state);
      return;
    }

    if (state.operator !== '') {
      calculator(state, operator);
      return;
    }

    render({
      result: state.result,
      num1: state.num1,
      operator,
      num2: state.num2,
    });
  };

  const viewNumber = ({
    result, num1, operator, num2,
  }) => {
    if (num1 === '') {
      return result;
    }

    if (operator === '' || num2 === '') {
      return num1;
    }

    return num2;
  };

  const result = viewNumber(resultState);

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {result}
      </p>
      <p>
        {numbers.map((number) => (
          <button type="button" onClick={() => handleClickNumber(number, resultState)}>{number}</button>
        ))}
      </p>
      <p>
        {operators.map((operator) => (
          <button type="button" onClick={() => handleClickOperator(operator, resultState)}>{operator}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initState);
