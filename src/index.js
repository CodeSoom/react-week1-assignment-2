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

function render(viewNumber, operator, inputNumber, resultNumber) {
  const setViewNumber = (i) => {
    render(parseInt(String(viewNumber) + String(i), 10), operator, i, resultNumber);
  };

  const setOperator = (oper) => {
    if (oper === '+') {
      render(0, oper, 0, viewNumber + resultNumber);
    } else if (oper === '=') {
      if (operator === '+' || operator === '-' || operator === '*' || operator === '/') {
        render(viewNumber + resultNumber, '', 0, 0);
      } else {
        render(0, '', 0, 0);
      }
    } else {
      render(0, '', 0, 0);
    }
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        보이는값:
        { viewNumber || resultNumber }
      </p>
      <p>
        연산자클릭:
        { operator }
      </p>
      <p>
        숫자버튼클릭:
        { inputNumber }
      </p>
      <p>
        임시값:
        { resultNumber }
      </p>
      <p>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
            <button
              type="button"
              onClick={() => setViewNumber(i)}
            >
              {i}
            </button>
          ))
        }
      </p>
      <p>
        {
          ['+', '-', '*', '/', '='].map((oper) => (
            <button
              type="button"
              onClick={() => setOperator(oper)}
            >
              {oper}
            </button>
          ))
        }
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0, '', 0, 0);
