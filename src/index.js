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

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const calculations = ['+', '-', '*', '/', '='];

const calculateFuntions = {
  '': (x, y) => x || y,
  '=': (x, y) => x || y,
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

function onCalculate(accumulator, clickedNumber, clickedOperator) {
  return calculateFuntions[clickedOperator](accumulator, clickedNumber);
}

function render({ accumulator, clickedNumber, clickedOperator }) {
  function handlerClickNumber({ value }) {
    render({
      accumulator,
      clickedNumber: clickedNumber * 10 + value,
      clickedOperator,
    });
  }

  function handlerClickOperator({ value }) {
    render({
      accumulator: onCalculate(accumulator, clickedNumber, clickedOperator),
      clickedNumber: 0,
      clickedOperator: value,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <div>{clickedNumber || accumulator}</div>
      {/* <div>
        {clickedSecondNum === null
          ? clickedFirstNum || 0
          : clickedSecondNum || 0}
      </div> */}
      <div>
        {numbers.map((num) => (
          <button onClick={() => handlerClickNumber({ value: num })}>
            {num}
          </button>
        ))}
      </div>
      <div>
        {calculations.map((calculation) => (
          <button onClick={() => handlerClickOperator({ value: calculation })}>
            {calculation}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

// 초기값 선언
const initialState = {
  accumulator: 0,
  clickedNumber: null,
  clickedOperator: '',
};

render(initialState);
