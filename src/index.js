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

function curry(f) {
  return function first(a) {
    return function second(b) {
      return f(a, b);
    };
  };
}

const rootElement = document.getElementById('app');

const OPERATORS = [
  { key: '+', func: curry((x, y) => x + y) },
  { key: '-', func: curry((x, y) => x - y) },
  { key: '*', func: curry((x, y) => x * y) },
  { key: '/', func: curry((x, y) => x / y) },
  { key: '=' },
];

function render({ displayedNum, operator, currentValue }) {
  function onClickNum(number) {
    const isOperating = typeof currentValue === 'function';
    const operated = isOperating ? currentValue(number) : number;
    return render({ displayedNum: number, operator, currentValue: operated });
  }

  function onClickOperator(func) {
    return render({ displayedNum, operator, currentValue: func(displayedNum) });
  }

  function onClickFinal() {
    return render({ displayedNum: currentValue, operator: '=', currentValue: 0 });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayedNum}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button type="button" onClick={() => onClickNum(number)}>{number}</button>
        ))}
      </p>
      <p>
        {OPERATORS.map(({ key, func }) => (
          <button type="button" onClick={key === '=' ? onClickFinal : () => onClickOperator(func)}>{key}</button>
        ))}
      </p>
    </div>
  );

  rootElement.textContent = '';
  rootElement.appendChild(element);
}

render({ displayedNum: 0, operator: '', currentValue: 0 });
