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

// 초기 상태
const initialState = {
  currentNum: null,
  currentOperator: null,
  operand: null,
  isNumberInitialized: false,
};

function render(props = initialState) {
  const {
    currentNum, operand, currentOperator, isNumberInitialized,
  } = props;

  // ui 요소 데이터
  const numsPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];

  // 연산 메서드 모음 객체
  const compute = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };

  // 숫자 클릭 이벤트
  const handleNum = (clickedNum) => {
    const preNumber = currentNum * 10;
    const assignOperand = operand ? operand * 10 + clickedNum : clickedNum;

    if (isNumberInitialized) {
      return render({ ...initialState, currentNum: clickedNum });
    }

    if (!currentOperator) {
      return currentNum
        ? render({ ...initialState, currentNum: preNumber + clickedNum })
        : render({ ...initialState, currentNum: clickedNum });
    }

    return render({
      ...initialState,
      currentNum,
      currentOperator,
      operand: assignOperand,
    });
  };

  // 연산자 클릭 이벤트
  const handleOperator = (clickedOperator) => {
    if (clickedOperator === '=') {
      return operand
        ? render({
          ...initialState,
          currentNum: compute[currentOperator](currentNum, operand),
          isNumberInitialized: true,
        })
        : render({ ...initialState, currentNum, isNumberInitialized: true });
    }

    if (operand) {
      return render({
        ...initialState,
        currentNum: compute[currentOperator](currentNum, operand),
        currentOperator: clickedOperator,
      });
    }

    return render({
      ...initialState,
      currentNum,
      currentOperator: clickedOperator,
    });
  };

  // ui 요소
  const element = (
    <div>
      <p>간단 계산기</p>
      <div>{operand || currentNum || 0}</div>
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

render(initialState);
