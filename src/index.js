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

const state = {
  display: '',
  left: '',
  operator: '',
  result: 0,
};

function render(number) {
  /*
   * 관심사:
   *  - 입력된 숫자 이어붙인다.
   * render 로직:
   *  - 이어붙인 숫자를 렌더 함수에 전달한다.
   */
  function handleNumber(e) {
    state.display += e.target.value;
    render(state.display);
  }

  // 관심사: 좌항과 우항을 연산한다.
  function calculate(left, right, operator) {
    const leftNumber = +left;
    const rightNumber = +right;

    switch (operator) {
    case '+':
      return leftNumber + rightNumber;
    case '-':
      return leftNumber - rightNumber;
    case '*':
      return leftNumber * rightNumber;
    case '/':
      return leftNumber / rightNumber;
    default:
      return 0;
    }
  }

  /*
   * 관심사:
   *  - 연산자를 등록한다.
   *  - 좌항(left operand)을 등록한다.
   * render 로직:
   *  - 좌항과 operator가 존재하는 경우에만 계산 결과값을 렌더 함수에 전달한다.
   */
  function handleOperator(e) {
    if (state.operator && state.left !== 0) {
      state.display = `${calculate(state.left, state.display, state.operator)}`;
      render(state.display);
    }

    // 연산자를 등록한다.
    state.operator = e.target.value;
    // 좌항을 등록한다. display를 초기화한다.
    state.left = state.display;
    state.display = '';
  }

  /*
   * 관심사:
   *  - state에 등록된 피연산자와 연산자를 이용해서 계산한다.
   * render 로직:
   *  - 결과값을 렌더 함수에 전달한다.
   */
  function handleResult(e) {
    state.result = calculate(state.left, state.display, state.operator);
    state.display = `${state.result}`;
    render(state.display);
    state.display = '';
    state.operator = '';
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number || 0}</p>
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" value={i} onClick={handleNumber}>{i}</button>
        ))}
      </div>
      <div>
        <button type="button" value="+" onClick={handleOperator}>+</button>
        <button type="button" value="-" onClick={handleOperator}>-</button>
        <button type="button" value="*" onClick={handleOperator}>*</button>
        <button type="button" value="/" onClick={handleOperator}>/</button>
        <button type="button" value="=" onClick={handleResult}>=</button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(state.number);
