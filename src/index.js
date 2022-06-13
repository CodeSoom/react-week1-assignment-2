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

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const operators = ['+', '-', '*', '/', '='];

const initialState = {
  num1: '',
  num2: '',
  operator: '',
  result: 0,
  show: '0',
};

function render(propState) {
  const obj = propState;
  const {
    num1, num2, operator, result, show,
  } = obj;

  const setState = (state, value) => {
    obj[state] = value;
  };

  const setNum = (num, target) => {
    const value = obj[target] + num;
    setState(target, value);
    setState('show', value);
    render(obj);
  };

  const setNumInit = () => {
    setState('num1', '');
    setState('num2', '');
  };

  const Calculate = (target1, target2) => {
    const Calculation = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
    };

    const value = Calculation[operator]?.(target1, target2);
    setState('result', value);
    setState('show', value);
    setNumInit();
  };

  const handleClickNumberButton = (num) => {
    if (result || operator === '') return setNum(num, 'num1');
    return setNum(num, 'num2');
  };

  const handleClickOperatorButton = (propOperator) => {
    if (operator) {
      if (result) Calculate(result, Math.floor(num1));
      if (!result) Calculate(Math.floor(num1), Math.floor(num2));
    }
    setState('operator', propOperator);
    render(obj);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{show}</p>
      <div>
        {numbers.map((i, idx) => (
          <button
            onClick={() => {
              handleClickNumberButton(i);
            }}
            key={i}
            type="button"
          >
            {i}
          </button>
        ))}
      </div>
      <div>
        {operators.map((i, idx) => (
          <button
            onClick={() => {
              handleClickOperatorButton(i);
            }}
            key={i}
            type="button"
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );

  const app = document.getElementById('app');

  app.textContent = '';
  app.appendChild(element);
}

render(initialState);
