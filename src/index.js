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

function render(value = 0) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{value}</p>
      <div className="number-btn-con">
        <button type="button" onClick={() => { render(handleClickNumber(value, 1)); }}>1</button>
        <button type="button" onClick={() => { render(handleClickNumber(value, 2)); }}>2</button>
        <button type="button" onClick={() => { render(handleClickNumber(value, 3)); }}>3</button>
        <button type="button" onClick={() => { render(handleClickNumber(value, 4)); }}>4</button>
        <button type="button" onClick={() => { render(handleClickNumber(value, 5)); }}>5</button>
        <button type="button" onClick={() => { render(handleClickNumber(value, 6)); }}>6</button>
        <button type="button" onClick={() => { render(handleClickNumber(value, 7)); }}>7</button>
        <button type="button" onClick={() => { render(handleClickNumber(value, 8)); }}>8</button>
        <button type="button" onClick={() => { render(handleClickNumber(value, 9)); }}>9</button>
        <button type="button" onClick={() => { render(handleClickNumber(value, 0)); }}>0</button>
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

  app.textContent = '';
  app.appendChild(element);
}

render();
