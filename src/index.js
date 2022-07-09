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
  renderValue: 0,
  saveValue: 0,
  operator: '',
};

function render({ result }) {
  const appElement = document.getElementById('app');

  /** 숫자 */
  const handleClickNumber = (value) => {
    if (calculator.operator === '') {
      const num = calculator.renderValue + String(value);
      calculator.renderValue = Number(num);
      render({ result: num });
    } else {
      const num = calculator.saveValue + String(value);
      calculator.saveValue = Number(num);
      render({ result: num });
    }
  };

  /** 연산자 */
  const handleClickOperator = (type) => {
    switch (type) {
      default:
      case '+':
        calculator.operator = '+';
        return render({ result: calculator.renderValue + calculator.saveValue });
      case '-':
        calculator.operator = '-';
        return render({ result: calculator.renderValue - calculator.saveValue });
      case '*':
        calculator.operator = '*';
        return render({ result: calculator.renderValue * calculator.saveValue });
      case '/':
        calculator.operator = '/';
        if (calculator.saveValue === 0) {
          return render({ result: calculator.renderValue / 1 });
        }
        return render({ result: calculator.renderValue / calculator.saveValue });
    }
  };

  if (result === Infinity) {
    render({ result: calculator.renderValue });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <span>{result}</span>
      <br />
      <br />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item) => (
        <button type="button" onClick={() => handleClickNumber(item)}>
          {item}
        </button>
      ))}
      <br />
      <br />
      {['+', '-', '*', '/'].map((item) => (
        <button type="button" onClick={() => handleClickOperator(item)}>
          {item}
        </button>
      ))}
      <button type="button" onClick={() => handleClickOperator(calculator.operator)}>
        =
      </button>
    </div>
  );

  appElement.textContent = '';
  appElement.appendChild(element);
}

render({ result: 0 });
