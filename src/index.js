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
  { key: '=', func: (v) => v },
];

function render({
  displayedNum,
  currentValue,
  isDoneFirstCal = false,
}) {
  function setState(newState) {
    render({
      displayedNum,
      currentValue,
      isDoneFirstCal,
      ...newState,
    });
  }

  const isOperating = typeof currentValue === 'function';

  function onClickNum(number) {
    const numberClickedAgain = Number(String(displayedNum) + String(number));
    const operated = isOperating && currentValue(number);

    const nextCurrentValue = isOperating
      ? operated
      : numberClickedAgain;

    const nextDisplayedNum = (() => {
      if (isOperating) {
        return isDoneFirstCal ? operated : number;
      }

      return numberClickedAgain;
    })();

    return setState({
      displayedNum: nextDisplayedNum,
      currentValue: nextCurrentValue,
      isDoneFirstCal: isDoneFirstCal || isOperating,
    });
  }

  function onClickOperator({ key, func }) {
    const operatorApplied = func(currentValue);

    if (key === '=') {
      return setState({
        displayedNum: isOperating ? operatorApplied : currentValue,
      });
    }
    return setState({ currentValue: operatorApplied });
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
          <button type="button" onClick={() => onClickOperator({ key, func })}>{key}</button>
        ))}
      </p>
    </div>
  );

  rootElement.textContent = '';
  rootElement.appendChild(element);
}

render({ displayedNum: 0, currentValue: 0 });
