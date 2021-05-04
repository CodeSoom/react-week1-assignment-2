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

const elements = {
  result: 0,
  number1: '',
  sign: '',
  number2: '',
};

function render() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const calcSigns = ['+', '-', '*', '/', '='];

  const calculator = (item) => {
    const num1 = Number(elements.number1);
    const num2 = Number(elements.number2);

    switch (elements.sign) {
    case '+':
      elements.result = num1 + num2;
      break;
    case '-':
      elements.result = num1 - num2;
      break;
    case '*':
      elements.result = num1 * num2;
      break;
    case '/':
      elements.result = num1 / num2;
      break;
    default:
      return '';
    }

    if (item) {
      elements.number1 = elements.result;
    } else {
      elements.number1 = '';
    }
    elements.number2 = '';
    render();
    return item || '';
  };

  const handleClickItem = (item) => {
    if (item === '=') {
      calculator();
      return;
    }

    if (typeof item === 'string') {
      elements.sign = (elements.sign !== '' ? calculator(item) : item);
      return;
    }

    elements.number1 += (elements.sign === '' ? item : '');
    elements.number2 += (elements.sign === '' ? '' : item);
    render();
  };

  const viewNumber = () => {
    if (elements.number1 === '') {
      return elements.result;
    }

    if (elements.sign === '') {
      return elements.number1;
    }

    if (Number(elements.number1) && elements.number2 === '') {
      return elements.number1;
    }

    return elements.number2;
  };

  elements.result = viewNumber();

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {elements.result}
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
