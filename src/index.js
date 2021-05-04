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

const elements = {result: 0, number1: '', sign: '', number2: ''};

function render() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const calcSigns = ['+', '-', '*', '/', '='];

  const handleClickItem = (item) => {
    if (item === '=') {
      const num1 = Number(elements.number1);
      const num2 = Number(elements.number2);

      switch (elements.sign) {
        case '+':
          const sum = num1 + num2;
          elements.result = sum;
          break;
        case '-':
          const minus = num1 - num2;
          elements.result = minus;
          break;
        case '*':
          const multi = num1 * num2;
          elements.result = multi;
          break;
        case '/':
          const div = num1 / num2;
          elements.result = div;
          break;
      }

      elements.number1 = '';
      elements.sign = '';
      elements.number2 = '';
      render();
      return;
    }

    if (typeof item === 'string') {
      elements.sign = item;
      return;
    }

    elements.sign === '' ? elements.number1 += item : elements.number2 += item;

    render();
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {elements.number1 === ''
          ? elements.result
          : elements.sign === ''
            ? elements.number1
            : elements.number2}
      </p>
      <p>
        {numbers.map((num) => (
          <button type="button" onClick={() => handleClickItem(num)}>{num}</button>
        ))}
      </p>
      <p>
        {calcSigns.map((sign) => (
          <button type="button" onClick={() => handleClickItem(sign)}>{sign}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
