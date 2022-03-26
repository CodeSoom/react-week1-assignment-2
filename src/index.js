/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
      return;
    }
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

const initValue = {
  displayNumber: 0,
  storeNumber: 0,
  sign: '',
  isNumber: true,
};

function render({
  storeNumber,
  displayNumber,
  sign,
  isNumber,
}) {
  const app = document.getElementById('app');
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];

  const calculate = (value) => {
    const operator = {
      '+': storeNumber + displayNumber,
      '-': storeNumber - displayNumber,
      '*': storeNumber * displayNumber,
      '/': storeNumber / displayNumber,
    };
    const clacNumber = operator[sign] || 0;
    if (value === '=') {
      render({
        displayNumber: clacNumber,
        isNumber: false,
      });
    } else {
      render({
        storeNumber: clacNumber,
        displayNumber: clacNumber,
        sign: value,
        isNumber: false,
      });
    }
  };

  const handleClickNumber = (value) => {
    const resultNumber = (isNumber ? displayNumber : 0) * 10 + value;
    render({
      displayNumber: resultNumber,
      storeNumber,
      sign,
      isNumber: true,
    });
  };

  const handleClickOperator = (value) => {
    if (isNumber && sign !== '') {
      calculate(value);
    } else {
      render({
        displayNumber,
        storeNumber: displayNumber,
        sign: value,
        isNumber: false,
      });
    }
  };

  const element = (
    <div className="calculator">
      <p className="calculator-title">간단 계산기</p>
      <p className="calculator-result">{displayNumber}</p>
      <div className="calculator-key">
        <ul className="calculator-number">
          {numbers.map((i) => {
            let list = '';
            list = (
              <li>
                <button type="button" onClick={() => handleClickNumber(i)}>{i}</button>
              </li>
            );
            return list;
          })}
        </ul>

        <ul className="calculator-operator">
          {operators.map((i) => {
            let list = '';
            list = (
              <li>
                <button type="button" onClick={() => handleClickOperator(i)}>{i}</button>
              </li>
            );
            return list;
          })}
        </ul>
      </div>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render(initValue);
