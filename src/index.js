/* eslint-disable no-use-before-define */
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
  display: [],
  acc: [],
  current: [],
};

function updateDisplay(number) {
  state.display = [number];
}

function onClickOperand(clickedNumber) {
  state.current = [...state.current, clickedNumber];
  updateDisplay(Number(state.current.join('')));
  render(state);
}

function onClickOperator(operator) {
  state.acc = [...state.acc, Number(state.current.join('')), operator];
  state.current = [];


  const calculators = {
    '+': () => { state.acc = [state.acc[0] + (state.acc[2] || 0), operator]; },
    '*': () => { state.acc = [state.acc[0] * (state.acc[2] || 1), operator]; },
    '-': () => { state.acc = [state.acc[0] - (state.acc[2] || 0), operator]; },
    '/': () => { state.acc = [state.acc[0] / (state.acc[2] || 1), operator]; },
  };

  calculators[state.acc[1]]();
  updateDisplay(state.acc[0]);
  render(state);
}

function render(props) {
  const element = (
    <div id="main">
      <p>간단 계산기</p>
      <p id="show">{props.display}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => <button type="button" onClick={() => onClickOperand(n)}>{n}</button>)}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((o) => <button type="button" onClick={() => onClickOperator(o)}>{o}</button>)}
      </p>
    </div>
  );


  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}


render(state);
