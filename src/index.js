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

const temp = {
  leftNumber: 0,
  rightNumber: 0,
  operator: null,
  result: 0,
};

function render(value = 0) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];

  function operate(operator) {
    if (operator === '+') {
      temp.result = temp.leftNumber + temp.rightNumber;
    } else if (operator === '-') {
      temp.result = temp.leftNumber - temp.rightNumber;
    } else if (operator === '*') {
      temp.result = temp.leftNumber * temp.rightNumber;
    } else if (operator === '/') {
      temp.result = temp.leftNumber / temp.rightNumber;
    } else if (operator === '=') {
      if (temp.operator === '+') {
        temp.result = temp.leftNumber + temp.rightNumber;
      } else if (temp.operator === '-') {
        temp.result = temp.leftNumber - temp.rightNumber;
      } else if (temp.operator === '*') {
        temp.result = temp.leftNumber * temp.rightNumber;
      } else if (temp.operator === '/') {
        temp.result = temp.leftNumber / temp.rightNumber;
      }
    }
  }

  function handleClickNumber(number) {
    if (temp.operator === null) {
      temp.leftNumber = temp.leftNumber * 10 + number;
      render(temp.leftNumber);
      // console.log(temp);
    } else {
      temp.rightNumber = temp.rightNumber * 10 + number;
      render(temp.rightNumber);
      // console.log(temp);
    }
  }

  function handleClickOperator(operator) {
    if (operator === '=') {
      operate(operator);
      render(temp.result);
      // console.log(temp);
      temp.leftNumber = 0;
      temp.rightNumber = 0;
      temp.operator = null;
      temp.result = 0;
      // console.log(temp);
    // eslint-disable-next-line brace-style
    }

    // 연속해서 연산하는 경우
    else if (operator !== '=' && temp.operator) {
      operate(temp.operator);
      temp.operator = operator;
      temp.leftNumber = temp.result;
      temp.rightNumber = 0;
      render(temp.result);
      // console.log(temp);
    } else if (operator !== '=') {
      temp.operator = operator;
      // console.log(temp);
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {value}
      </p>
      <p>
        {numbers.map((number) => (
          <button type="button" onClick={() => handleClickNumber(number)}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {operators.map((operator) => (
          <button type="button" onClick={() => handleClickOperator(operator)}>
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
