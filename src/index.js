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

const defaultProps = {
  currentValue: 0,
  saveValue: 0,
  operator: '',
};

const calculator = {
  '=': (x, y) => x || y,
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '/': (x, y) => x / y,
  '*': (x, y) => x * y,
};

function render({ currentValue, saveValue, operator }) {
  const appElement = document.getElementById('app');

  /** reset */
  const handleReset = () => render(defaultProps);

  /** 숫자 */
  const handleClickNumber = (value) => {
    const num = currentValue + String(value);
    render({ currentValue: Number(num), saveValue, operator });
  };

  /** 연산자 */
  const handleClickOperator = (type) => {
    if (operator) {
      const result = calculator[operator](saveValue, currentValue);
      render({ currentValue: 0, saveValue: result, operator: type });
    } else {
      const result = calculator[type](saveValue, currentValue);
      if (saveValue === 0) {
        render({ currentValue: 0, saveValue: currentValue, operator: type });
      } else {
        render({ currentValue: 0, saveValue: result, operator: type });
      }
    }
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <div>{currentValue || saveValue}</div>
      <br />
      <br />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item) => (
        <button type="button" onClick={() => handleClickNumber(item)}>
          {item}
        </button>
      ))}
      <br />
      <br />
      {['+', '-', '*', '/', '='].map((item) => (
        <button type="button" onClick={() => handleClickOperator(item)}>
          {item}
        </button>
      ))}
      <br />
      <br />

      <button type="button" onClick={handleReset}>
        reset
      </button>
    </div>
  );

  appElement.textContent = '';
  appElement.appendChild(element);
}

render(defaultProps);
