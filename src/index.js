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

const calculator = {
  value: 0,
  sign: '',
  result: 0,
};

const handleClickNumber = (number) => {
  calculator.value = number;
};

function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="screen">{calculator.value}</p>
      <div className="number-btn-con">
        <button type="button" onClick={() => { handleClickNumber(1); render(); }}>1</button>
        <button type="button" onClick={() => { handleClickNumber(2); render(); }}>2</button>
        <button type="button" onClick={() => { handleClickNumber(3); render(); }}>3</button>
        <button type="button" onClick={() => { handleClickNumber(4); render(); }}>4</button>
        <button type="button" onClick={() => { handleClickNumber(5); render(); }}>5</button>
        <button type="button" onClick={() => { handleClickNumber(6); render(); }}>6</button>
        <button type="button" onClick={() => { handleClickNumber(7); render(); }}>7</button>
        <button type="button" onClick={() => { handleClickNumber(8); render(); }}>8</button>
        <button type="button" onClick={() => { handleClickNumber(9); render(); }}>9</button>
        <button type="button" onClick={() => { handleClickNumber(0); render(); }}>0</button>
      </div>
      <div className="sign-btn-con">
        <button type="button" onClick={() => {}}>+</button>
        <button type="button" onClick={() => {}}>-</button>
        <button type="button" onClick={() => {}}>*</button>
        <button type="button" onClick={() => {}}>/</button>
        <button type="button" onClick={() => {}}>=</button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
