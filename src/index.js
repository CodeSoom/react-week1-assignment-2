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

function render(state = { newNum: 0, lastNum: 0, operator: undefined }) {
  const onClickNum = (num) => {
    state.newNum = parseInt(state.newNum.toString() + num.toString());
    render(state);
  };

  const onClickOperator = (operator) => {
    if (state.newNum === 0 && state.operator) {
      alert('숫자를 한 번 더 입력하고 연산자를 입력하세요!');
      state = { newNum: 0, lastNum: 0, operator: undefined };
      render(state);
    }

    if (state.operator) {
      if (state.operator === '+') {
        state.operator = operator;
        state.newNum = state.lastNum + state.newNum;
        render(state);
        state.lastNum = state.newNum;
        state.newNum = 0;
      }
      if (state.operator === '-') {
        state.operator = operator;
        state.newNum = state.lastNum - state.newNum;
        render(state);
        state.lastNum = state.newNum;
        state.newNum = 0;
      }
      if (state.operator === '*') {
        state.operator = operator;
        state.newNum = state.lastNum * state.newNum;
        render(state);
        state.lastNum = state.newNum;
        state.newNum = 0;
      }
      if (state.operator === '/') {
        state.operator = operator;
        state.newNum = state.lastNum / state.newNum;
        render(state);
        state.lastNum = state.newNum;
        state.newNum = 0;
      }
    } else {
      state.operator = operator;
      state.lastNum = state.newNum;
      render(state);
      state.newNum = 0;
    }
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{state.newNum}</p>
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button type='button' onClick={() => onClickNum(num)}>
            {num}
          </button>
        ))}
      </div>
      <p> </p>
      <div>
        {['+', '-', '*', '/', '='].map((operator) => (
          <button type='button' onClick={() => onClickOperator(operator)}>
            {operator}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
