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

function render({ screen }) {
  const handleClickNumber = (prev, click) => render({ screen: prev * 10 + click });

  // const handleClickSign = (sign, operator, value, storeValue) => {
  //   const operation = {
  //     '+': storeValue + value,
  //     '-': storeValue - value,
  //     '*': storeValue * value,
  //     '/': storeValue / value,
  //   };
  //   if (storeValue !== 0) {
  //     return operation[operator];
  //   } 
  //   return value;
  // };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{screen}</p>
      <div className="number-btn-con">
        <button type="button" onClick={() => { handleClickNumber(screen, 1); }}>1</button>
        <button type="button" onClick={() => { handleClickNumber(screen, 2); }}>2</button>
        <button type="button" onClick={() => { handleClickNumber(screen, 3); }}>3</button>
        <button type="button" onClick={() => { handleClickNumber(screen, 4); }}>4</button>
        <button type="button" onClick={() => { handleClickNumber(screen, 5); }}>5</button>
        <button type="button" onClick={() => { handleClickNumber(screen, 6); }}>6</button>
        <button type="button" onClick={() => { handleClickNumber(screen, 7); }}>7</button>
        <button type="button" onClick={() => { handleClickNumber(screen, 8); }}>8</button>
        <button type="button" onClick={() => { handleClickNumber(screen, 9); }}>9</button>
        <button type="button" onClick={() => { handleClickNumber(screen, 0); }}>0</button>
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

render({ screen: 0 });
