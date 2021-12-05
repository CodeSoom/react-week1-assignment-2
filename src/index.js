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

function render(state) {
  const {
    displayedNum,
    operator,
    currentValue,
    isDoneFirstCal = false,
  } = state;

  const setState = (newState) => render({ ...state, ...newState });

  const isOperating = typeof currentValue === 'function';

  function onClickNum(number) {
    const numberClickedAgain = Number(String(displayedNum) + String(number));
    const operated = isOperating && currentValue(number);

    const nextCurrentValue = isOperating
      ? operated
      : numberClickedAgain;

    const nextDisplayedNum = isOperating
      ? isDoneFirstCal
        ? operated
        : number
      : numberClickedAgain;

    return setState({
      displayedNum: nextDisplayedNum,
      currentValue: nextCurrentValue,
    });
  }

  function onClickOperator(func) {
    return setState({ currentValue: func(displayedNum) });
  }

  function onClickFinal() {
    return setState({
      displayedNum: currentValue,
      operator: '=',
      isDoneFirstCal: true,
    });
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
