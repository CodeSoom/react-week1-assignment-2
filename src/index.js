/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* eslint-disable no-use-before-define */

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

const numbers = { screen: 0, preNumber: 0, constats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] };
const marks = { plusCount: '+', minusCount: '-', multiCount: '*', diviCount: '/', result: '=' };
const marksArr = ['+', '-', '*', '/', '='];
// 어떤 게 더 나은 방법일까?

function handleClickNumber(value) {
  if (numbers.screen === 0) {
    numbers.screen = value;
  } else {
    numbers.screen = parseInt(`${numbers.screen}${value}`);
  }
  render();
}

function handleClickMark(value) {
  // 이 부분 함수로 빼야 할 듯.
  if (value === marks.plusCount){
    numbers.screen += numbers.preNumber;
  }else if (value === marks.minusCount){

  }else if (value === marks.multiCount){

  }else if (value === marks.diviCount){

  }else if (value === marks.result){

  }
  render();
  // reset
  numbers.preNumber = numbers.screen;
  numbers.screen = 0;
  console.log(numbers.preNumber);
}

// 반복되는 부분이 있다!
function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{numbers.screen}</p>
      <p>
        {numbers.constats.map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {marksArr.map((i) => (
          <button type="button" onClick={() => handleClickMark(i)}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
