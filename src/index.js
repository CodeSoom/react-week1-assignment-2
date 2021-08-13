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
  display: '0',
  oldNum: 0,
  newNum: 0,
  result: 0,
  operator: '',
  isOperating: false,
};

function render() {
  function setState(operator) {
    state.operator = operator;
    state.display = String(state.result);
    state.oldNum = state.result;
    render();
  }

  function calculate() {
    if (state.operator === '+') {
      state.result = state.oldNum + state.newNum;
    } else if (state.operator === '-') {
      state.result = state.oldNum - state.newNum;
    } else if (state.operator === '/') {
      state.result = state.oldNum / state.newNum;
    } else if (state.operator === '*') {
      state.result = state.oldNum * state.newNum;
    }
  }

  function handleClickNumber(input) {
    if (state.isOperating) {
      state.display = '';
      state.isOperating = false;
    }
    state.display += input;
    state.display = state.display.replace(/^0/, '');
    state.newNum = Number(state.display);
    render();
  }

  function handleClickOperator() {
    state.isOperating = true;
    const {
      event: {
        target: { innerText: operator },
      },
    } = this;
    if (state.operator === '') {
      state.operator = operator;
      state.oldNum = state.newNum;
    } else if (state.operator === '=') {
      state.operator = operator;
    } else {
      calculate();
      setState(operator);
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="display">{state.display}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button type="button" onClick={() => handleClickOperator()}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(element);
}

render();
