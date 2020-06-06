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
  showData: [],
  accData: [],
  opData: [],
};

const calculator = (accData) => {
  let result = accData[0];
  let op;
  accData.forEach((ele, idx) => {
    if (typeof ele === 'string') {
      op = ele;
      return;
    }
    if (op === '+') result += accData[idx];
    if (op === '-') result -= accData[idx];
    if (op === '*') result *= accData[idx];
    if (op === '/') result /= accData[idx];
  });
  return result;
};

function updateShowData(number) {
  state.showData = [number];
}

function onClickOperand(clickedNumber) {
  state.opData = [...state.opData, clickedNumber];
  updateShowData(Number(state.opData.join('')));
  render(state);
}

function onClickOperator(operator) {
  const opData = Number(state.opData.join(''));
  state.opData = [];
  state.accData = [...state.accData, opData, operator];

  const result = calculator(state.accData);
  updateShowData(result);
  render(state);
}

function render(props) {
  const element = (
    <div id="main">
      <p>간단 계산기</p>
      <p id="show">{props.showData}</p>
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
