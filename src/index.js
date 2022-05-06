/* eslint-disable no-eval */
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

let value = 0;
const mark = '';
let equationArray = [0];
let equationEndFlag = false;

function pushEquation(input) {
  if (equationEndFlag) {
    equationEndFlag = false;
    equationArray = [0];
  }

  if (typeof equationArray[equationArray.length - 1] === 'number' && typeof input === 'number') { // 숫자가 연속할 때 합치기
    const prevValue = equationArray[equationArray.length - 1];
    equationArray.pop();
    value = Number(String(prevValue) + String(input));
    equationArray.push(value);
  } else if (input === '=') {
    value = eval(equationArray.join(''));
    equationEndFlag = true;
  } else if (typeof equationArray[equationArray.length - 1] === 'string') { // 이전 값이 부호일 때
    value = input;
    equationArray.push(input);
  } else if (typeof equationArray[equationArray.length - 1] === 'number') { // 이전 값이 숫자일 때
    value = eval(equationArray.join(''));
    equationArray.push(input);
  } else {
    equationArray.push(input);
  }
  render();
}

function getNumbers() {
  const array = [];
  for (let i = 1; i < 11; i += 1) {
    array.push(<button type="button" onClick={() => pushEquation(i % 10)}>{i % 10}</button>);
  }
  return array;
}

function getMarks() {
  const array = ['+', '-', '*', '/', '='];
  const result = array.map((item) => (<button type="button" onClick={() => pushEquation(item)}>{item}</button>));
  return result;
}

function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{value}</p>
      <p>{equationArray.join('')}</p>
      <p>{getNumbers()}</p>
      <p>{getMarks()}</p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
