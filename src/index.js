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

let operatorClicked = false;

function render({ count = 0, prevNum = 0, lastOperator = '' }) {
  function calculate(a, b, operator) {
    if (operator === '+') {
      return [a + b, a + b];
    }
    if (operator === '-') {
      return [a - b, a - b];
    }
    if (operator === '*') {
      return [a * b, a * b];
    }
    if (operator === '/') {
      return [a / b, a / b];
    }
  }

  function handleClickNumber(value) {
    if (count > Number.MAX_SAFE_INTEGER) {
      alert('더 큰 숫자는 표현이 어렵습니다.');
      return;
    }

    if (!operatorClicked) {
      count = count.toString() + value.toString();
      render({ count: Number(count), prevNum: prevNum, lastOperator });
      return;
    } 
    
    render({ count: value, prevNum: prevNum, lastOperator });
    operatorClicked = false;
  }

  function handleClickOperator(value) {
    if (value === '=') {
      [count, prevNum] = calculate(prevNum, count, lastOperator);
      render({ count: count, prevNum: prevNum, lastOperator });
      return;
    } 
    
    if (lastOperator) {
      [count, prevNum] = calculate(prevNum, count, lastOperator);
      render({ count: count, prevNum: prevNum, lastOperator: value });
      prevNum = count;
    }

    lastOperator = value;
    prevNum = count;
    count = 0;

    operatorClicked = true;
  }

  const element = (
    <div>
      <p>간단 계산기</p>

      <p>
        {count}
      </p>

      <p>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
        <button type="button" onClick={() => handleClickNumber(i)}>
          {i}
        </button>
      ))}
    </p>
    <p>
    {['+', '-', '*', '/', '='].map((i) => (
      <button type="button" onClick={() => handleClickOperator(i)}>
        {i}
      </button>
    ))}
  </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ count: 0, prevNum: 0, lastOperator: '' });
