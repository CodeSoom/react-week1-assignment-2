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
  accumulatedData: [],
  clikedData: [],
};

const calculator = (accumulatedData) => {
  let result = accumulatedData[0];
  let operator;
  accumulatedData.forEach((arrayElement, index) => {
    if (typeof arrayElement === 'string') {
      operator = arrayElement;
      return;
    }
    if (operator === '+') result += accumulatedData[index];
    if (operator === '-') result -= accumulatedData[index];
    if (operator === '*') result *= accumulatedData[index];
    if (operator === '/') result /= accumulatedData[index];
  });
  return result;
};

function updateShowData(number) {
  state.display = [number];
}

function onClickOperand(clickedNumber) {
  state.clikedData = [...state.clikedData, clickedNumber];
  updateShowData(Number(state.clikedData.join('')));
  render(state);
}

function onClickOperator(operator) {
  const clikedData = Number(state.clikedData.join(''));
  state.clikedData = [];
  state.accumulatedData = [...state.accumulatedData, clikedData, operator];

  const result = calculator(state.accumulatedData);
  updateShowData(result);
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
