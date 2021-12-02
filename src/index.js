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

function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="screen">{calculator.value}</p>
      <div className="number-btn-con">
        <button type="button" onClick={() => {}}>1</button>
        <button type="button" onClick={() => {}}>2</button>
        <button type="button" onClick={() => {}}>3</button>
        <button type="button" onClick={() => {}}>4</button>
        <button type="button" onClick={() => {}}>5</button>
        <button type="button" onClick={() => {}}>6</button>
        <button type="button" onClick={() => {}}>7</button>
        <button type="button" onClick={() => {}}>8</button>
        <button type="button" onClick={() => {}}>9</button>
        <button type="button" onClick={() => {}}>0</button>
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
