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
  currentNum = null,
  currentOperator = null,
  operand = null,
  isFin = false,
) {
  // ui 요소 데이터
  const numsPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];

  // 연산 메서드 모음 객체
  const compute = {
    '+': (x, y) => Number(x) + Number(y),
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };

  // 숫자 클릭 이벤트
  const handleNum = (clickedNum) => {
    const assignOperand = operand ? operand + String(clickedNum) : clickedNum;

    if (isFin) {
      return render(clickedNum);
    }

    if (!currentOperator) {
      return currentNum
        ? render(currentNum + String(clickedNum))
        : render(clickedNum);
    }

    return render(currentNum, currentOperator, assignOperand);
  };

  // 연산자 클릭 이벤트
  const handleOperator = (clickedOperator) => {
    if (clickedOperator === '=') {
      return operand
        ? render(
          compute[currentOperator](currentNum, operand),
          null,
          null,
          true,
        )
        : render(currentNum, '=', null, true);
    }

    if (operand) {
      return render(
        compute[currentOperator](currentNum, operand),
        clickedOperator,
        null,
      );
    }

    return render(currentNum, clickedOperator);
  };

  // ui 요소
  const element = (
    <div>
      <p>간단 계산기</p>
      {operand ? <div>{operand}</div> : <div>{currentNum || 0}</div>}
      <hr />
      {numsPad.map((num) => (
        <button
          type="button"
          onClick={() => {
            handleNum(num);
          }}
        >
          {num}
        </button>
      ))}
      <br />
      {operators.map((operator) => (
        <button
          type="button"
          onClick={() => {
            handleOperator(operator);
          }}
        >
          {operator}
        </button>
      ))}
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
