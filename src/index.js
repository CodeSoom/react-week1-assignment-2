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

function render(
  result = 0,
  operator = '',
  operand = 0,
) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];

  const clickedOperator = operator;
  const firstOperand = +operand;

  function handleClickNumber(inputNumber) {
    if (clickedOperator === '=') { // 이미 이전 계산이 끝난 경우
      render(inputNumber, '', '');

      return;
    }

    if (clickedOperator !== '') { // 이전에 연산자 버튼을 눌렀을 경우
      render(inputNumber, clickedOperator, firstOperand);

      return;
    }

    const currentResult = +document.getElementById('result').innerText;

    if (currentResult === 0) {
      render(inputNumber, clickedOperator, firstOperand);
    } else {
      const res = +(currentResult.toString() + inputNumber.toString());

      render(res, clickedOperator, firstOperand);
    }
  }

  function handleClickOperator(inputOperator) {
    const currentResult = +document.getElementById('result').innerText;

    switch (inputOperator) {
    case '=': {
      if (clickedOperator === '+') {
        render(firstOperand + currentResult, '=', '');
      } else if (clickedOperator === '-') {
        render(firstOperand - currentResult, '=', '');
      } else if (clickedOperator === '*') {
        render(firstOperand * currentResult, '=', '');
      } else if (clickedOperator === '/') {
        render(firstOperand / currentResult, '=', '');
      }

      break;
    }
    default: {
      render(result, inputOperator, currentResult);
      break;
    }
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="result">{result}</p>
      <div>
        {numbers.map((num) => (
          <button
            type="button"
            value={num}
            onClick={() => handleClickNumber(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <br />
      <div>
        {operators.map((op) => (
          <button
            type="button"
            value={op}
            onClick={() => handleClickOperator(op)}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
