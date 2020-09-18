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
  result: '',
  numbers: [],
  operator: '',
};

const calculator = {
  plus: (...numbers) => Number(numbers[0]) + Number(numbers[1]),
  minus: (...numbers) => Number(numbers[0]) - Number(numbers[1]),
  multiply: (...numbers) => Number(numbers[0]) * Number(numbers[1]),
  divide: (...numbers) => Number(numbers[0]) / Number(numbers[1]),
};

const handleOperator = (type) => {
  const operator = {
    '+': () => calculator.plus(...state.numbers),
    '-': () => calculator.minus(...state.numbers),
    '*': () => calculator.multiply(...state.numbers),
    '/': () => calculator.divide(...state.numbers),
    '=': () => state.result,
  };

  return operator[type]();
};

function isNumber(value) {
  return value.match(/[0-9]/g);
}

function setState(func, value) {
  if (func(value)) {
    state.result += value;
  } else {
    state.numbers.push(state.result);

    if (state.operator) {
      state.result = String(handleOperator(state.operator));
      state.numbers.length = 0;
      state.numbers.push(state.result);
    }

    state.operator = value;
    state.result = '';
  }
}

function render() {
  const element = (
    <div>
      <p>간단 계산기</p>

      <div id="result">
        {state.result ? state.result : state.numbers[0] ? state.numbers[0] : 0}
      </div>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button">{i}</button>
        ))}
      </p>

      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button type="button">{i}</button>
        ))}
      </p>
    </div>
  );
  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);

  document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      setState(isNumber, button.innerText);
      render();
    });
  });
}

render();
