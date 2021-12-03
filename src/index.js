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

const app = document.getElementById('app');

const handleClickNumber = (prev, value) => prev * 10 + value;

const handleClickSign = (sign, operator, value, storeValue) => {
  if (sign === '=') {
    switch (operator) {
    case '+': return storeValue + value;
    case '-': return storeValue - value;
    case '*': return storeValue * value;
    case '/': return storeValue / value;
    default: return 0;
    }
  } else {
    return sign;
  }
};
function render(value, sign = '', storeValue = 0) {
  const prevValue = sign === '' ? value : 0;
  const operator = sign !== '=' ? sign : '';
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{value}</p>
      <div className="number-btn-con">
        <button type="button" onClick={() => { render(handleClickNumber(prevValue, 1), operator, storeValue); }}>1</button>
        <button type="button" onClick={() => { render(handleClickNumber(prevValue, 2), operator, storeValue); }}>2</button>
        <button type="button" onClick={() => { render(handleClickNumber(prevValue, 3), operator, storeValue); }}>3</button>
        <button type="button" onClick={() => { render(handleClickNumber(prevValue, 4), operator, storeValue); }}>4</button>
        <button type="button" onClick={() => { render(handleClickNumber(prevValue, 5), operator, storeValue); }}>5</button>
        <button type="button" onClick={() => { render(handleClickNumber(prevValue, 6), operator, storeValue); }}>6</button>
        <button type="button" onClick={() => { render(handleClickNumber(prevValue, 7), operator, storeValue); }}>7</button>
        <button type="button" onClick={() => { render(handleClickNumber(prevValue, 8), operator, storeValue); }}>8</button>
        <button type="button" onClick={() => { render(handleClickNumber(prevValue, 9), operator, storeValue); }}>9</button>
        <button type="button" onClick={() => { render(handleClickNumber(prevValue, 0), operator, storeValue); }}>0</button>
      </div>
      <div className="sign-btn-con">
        <button type="button" onClick={() => { render(value, handleClickSign('+', operator, value, storeValue), value); }}>+</button>
        <button type="button" onClick={() => { render(value, handleClickSign('-', operator, value, storeValue), value); }}>-</button>
        <button type="button" onClick={() => { render(value, handleClickSign('*', operator, value, storeValue), value); }}>*</button>
        <button type="button" onClick={() => { render(value, handleClickSign('/', operator, value, storeValue), value); }}>/</button>
        <button type="button" onClick={() => { render(handleClickSign('=', operator, value, storeValue), '='); }}>=</button>
      </div>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render(0);
