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

function render({
  screenNumber,
  sign = '',
  storeNumber = 0,
  numBtnYn = true,
}) {
  const handleClickNumber = (clickNumber) => {
    const resultNumber = (numBtnYn ? screenNumber : 0) * 10 + clickNumber;
    render({
      screenNumber: resultNumber,
      sign,
      storeNumber,
      numBtnYn: true,
    });
  };

  const calculate = (clickSign) => {
    const operation = {
      '+': storeNumber + screenNumber,
      '-': storeNumber - screenNumber,
      '*': storeNumber * screenNumber,
      '/': storeNumber / screenNumber,
    };
    if (clickSign === '=') {
      render({
        screenNumber: operation[sign],
        numBtnYn: false,
      });
    } else {
      render({
        screenNumber: operation[sign],
        sign: clickSign,
        storeNumber: operation[sign],
        numBtnYn: false,
      });
    }
  };

  const handleClickSign = (clickSign) => {
    if (numBtnYn && sign !== '') {
      calculate(clickSign, sign);
    } else {
      render({
        screenNumber,
        sign: clickSign,
        storeNumber: screenNumber,
        numBtnYn: false,
      });
    }
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{screenNumber}</p>
      <div className="number-btn-con">
        <button type="button" onClick={() => { handleClickNumber(1); }}>1</button>
        <button type="button" onClick={() => { handleClickNumber(2); }}>2</button>
        <button type="button" onClick={() => { handleClickNumber(3); }}>3</button>
        <button type="button" onClick={() => { handleClickNumber(4); }}>4</button>
        <button type="button" onClick={() => { handleClickNumber(5); }}>5</button>
        <button type="button" onClick={() => { handleClickNumber(6); }}>6</button>
        <button type="button" onClick={() => { handleClickNumber(7); }}>7</button>
        <button type="button" onClick={() => { handleClickNumber(8); }}>8</button>
        <button type="button" onClick={() => { handleClickNumber(9); }}>9</button>
        <button type="button" onClick={() => { handleClickNumber(0); }}>0</button>
      </div>
      <div className="sign-btn-con">
        <button type="button" onClick={() => { handleClickSign('+'); }}>+</button>
        <button type="button" onClick={() => { handleClickSign('-'); }}>-</button>
        <button type="button" onClick={() => { handleClickSign('*'); }}>*</button>
        <button type="button" onClick={() => { handleClickSign('/'); }}>/</button>
        <button type="button" onClick={() => { handleClickSign('='); }}>=</button>
      </div>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render({ screenNumber: 0 });
