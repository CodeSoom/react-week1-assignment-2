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
  /* 관심사: 입력된 숫자 이어붙인다.
   * render:
   *  - 이전 숫자에 계속 이어붙여서를 렌더링 한다.
   *  - 숫자와 연산자가 연속해서 입력되면 left 처리를 하고 새롭게 렌더링한다.
   */
  function handleNumber(e) {
    state.display += e.target.value;
    render(state.display);
  }

  // 관심사: 좌항과 우항을 연산한다.
  function calculate(left, right, operator) {
    const leftInt = +left;
    const rightInt = +right;

    switch (operator) {
    case '+':
      return leftInt + rightInt;
    case '-':
      return leftInt - rightInt;
    case '*':
      return leftInt * rightInt;
    case '/':
      return leftInt / rightInt;
    default:
      return 0;
    }
  }

  /*
   * 관심사:
   *  - 연산자를 등록한다.
   *  - 좌항(state.left)을 등록한다.
   * render: 좌항과 operator가 존재하는 경우에만 계산 결과값을 렌더한다.
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
   *  - state에 등록된 displayNumber와 left를 계산한다.
   * render 로직:
   *  - 결과값을 display 한다.
   *  - 새로운 계산을 위해 state를 초기화한다.
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
        <button type="button" value="1" onClick={handleNumber}>1</button>
        <button type="button" value="2" onClick={handleNumber}>2</button>
        <button type="button" value="3" onClick={handleNumber}>3</button>
        <button type="button" value="4" onClick={handleNumber}>4</button>
        <button type="button" value="5" onClick={handleNumber}>5</button>
        <button type="button" value="6" onClick={handleNumber}>6</button>
        <button type="button" value="7" onClick={handleNumber}>7</button>
        <button type="button" value="8" onClick={handleNumber}>8</button>
        <button type="button" value="9" onClick={handleNumber}>9</button>
        <button type="button" value="0" onClick={handleNumber}>0</button>
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
