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

const INIT = {
  history: [],
  display: null,
};
const SYMBOLS = ['+', '-', '*', '/'];

const last = (arr) => arr[arr.length - 1];
const numberConcat = (a, b) => a * 10 + b;
const isNumber = (value) => !Number.isNaN(+value);
const copy = (arr) => [...arr];
const replaceLastItem = (arr, value) => {
  arr.splice(arr.length - 1, 1, value);
  return arr;
};

function calculate(list) {
  return list.reduce((acc, cur, index, arr) => {
    if (SYMBOLS.includes(cur)) {
      const nextItem = arr[index + 1];
      if (!nextItem) {
        return acc;
      }
      switch (cur) {
      case '+':
        return acc + nextItem;
      case '-':
        return acc - nextItem;
      case '*':
        return acc * nextItem;
      case '/':
        return acc / nextItem;
      default:
        return acc;
      }
    }
    return acc;
  }, list[0] ?? 0);
}

function render({ history, display }) {
  function handleClickNumber(number) {
    if (SYMBOLS.includes(last(history))) {
      render({
        history: history.concat(number),
        display: number,
      });
    } else {
      render({
        history: replaceLastItem(copy(history), numberConcat(last(history), number)),
        display: numberConcat(last(history), number),
      });
    }
  }

  function handleClickSymbol(symbol) {
    if (SYMBOLS.includes(last(history))) {
      render({
        history: replaceLastItem(copy(history), numberConcat(last(history), symbol)),
        display,
      });
    } else {
      render({
        history: history.concat(symbol),
        display: calculate(history),
      });
    }
  }

  function handleClickEqual() {
    render({
      ...INIT,
      display: calculate(history),
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{display ?? 0}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>{i}</button>
        ))}
      </p>
      <p>
        {SYMBOLS.map((i) => (
          <button type="button" onClick={() => handleClickSymbol(i)}>{i}</button>
        ))}
        <button type="button" onClick={handleClickEqual}>=</button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(INIT);
