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

const calculateNumber = (pre, curr) => {
  if (pre === 0) {
    return curr;
  }
  return pre * 10 + curr;
};

const calculateByOperator = (value1, value2, operator) => {
  switch (operator) {
  case '+':
    return value1 + value2;
  case '-':
    return value1 - value2;
  case '*':
    return value1 * value2;
  case '/':
  default:
    return value1 / value2;
  }
};


function render(result = 0, operator, buffer1 = 0, buffer2 = 0) {
  const addNumber = (number) => {
    if (operator) {
      render(calculateNumber(buffer2, number), operator, buffer1, calculateNumber(buffer2, number));
    } else {
      render(calculateNumber(buffer1, number), null, calculateNumber(buffer1, number));
    }
  };

  const addOperator = (op) => {
    const newResult = calculateByOperator(buffer1, buffer2, operator);
    if (op === '=') {
      render(newResult, null, newResult);
    } else if (buffer2 && operator) {
      render(newResult, op, newResult);
    } else {
      render(result, op, buffer1);
    }
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <div>{result}</div>
      <div>{[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => <button type="button" onClick={() => addNumber(i)}>{i}</button>)}</div>
      <div>
        <button type="button" onClick={() => addOperator('+')}>+</button>
        <button type="button" onClick={() => addOperator('-')}>-</button>
        <button type="button" onClick={() => addOperator('*')}>*</button>
        <button type="button" onClick={() => addOperator('/')}>/</button>
        <button type="button" onClick={() => addOperator('=')}>=</button>
      </div>
    </div>
  );


  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
