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
    const nextItem = arr[index + 1];
    if (!nextItem) {
      return acc;
    }
    if (cur === '+') {
      return acc + nextItem;
    }
    if (cur === '-') {
      return acc - nextItem;
    }
    if (cur === '*') {
      return acc * nextItem;
    }
    if (cur === '/') {
      return acc / nextItem;
    }
    return acc;
  }, list[0] ?? 0);
}

function render({ history, display }) {
  const copiedHistory = copy(history);
  const lastItem = last(history);
  const isLastItemIsSymbol = SYMBOLS.includes(lastItem);
  const isLastItemIsNumber = !Number.isNaN(lastItem);

  function handleClickNumber(number) {
    if (isLastItemIsSymbol) {
      return render({
        history: history.concat(number),
        display: number,
      });
    }

    if (lastItem === null || isLastItemIsNumber) {
      return render({
        history: replaceLastItem(
          copiedHistory,
          numberConcat(lastItem ?? 0, number),
        ),
        display: numberConcat(lastItem ?? 0, number),
      });
    }

    throw new Error('Input is wrong');
  }

  function handleClickSymbol(symbol) {
    if (isLastItemIsSymbol) {
      return render({
        history: replaceLastItem(
          copiedHistory,
          numberConcat(lastItem ?? 0, symbol),
        ),
        display,
      });
    }

    if (lastItem === null || isLastItemIsNumber) {
      return render({
        history: history.concat(symbol),
        display: calculate(history),
      });
    }

    throw new Error('Input is wrong');
  }

  function handleClickEqual() {
    render({
      history: [],
      display: calculate(history),
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{display ?? 0}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {SYMBOLS.map((i) => (
          <button type="button" onClick={() => handleClickSymbol(i)}>
            {i}
          </button>
        ))}
        <button type="button" onClick={handleClickEqual}>
          =
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  history: [],
  display: null,
});
