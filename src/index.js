/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, */
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

function getAppElement() {
  return document.getElementById('app');
}

const initState = {
  result: 0,
  acc: 0,
  symbolCnt: 0,
  prev: null,
};

function render(state) {
  const calculateAcc = (symbol, num) => {
    switch (symbol) {
    case '+':
      state.acc += num;
      state.prev = num;
      break;
    case '-':
      state.acc -= num;
      state.prev = num;
      break;
    case '*':
      state.acc *= num;
      state.prev = num;
      break;
    case '/':
      state.acc /= num;
      state.prev = num;
      break;
    case '=':
      // ?
      break;
    default:
    }
  };

  const handleClickNumber = (num) => {
    switch (typeof state.prev) {
    case 'number': {
      const accNum = Number(`${state.prev}${num}`);

      state.result = accNum;
      state.acc = accNum;
      state.prev = accNum;
      break;
    }
    case 'string':
      calculateAcc(state.prev, num);
      break;
    case 'object': {
      state.result = num;
      state.acc = num;
      state.prev = num;
      break;
    }
    default:
    }

    render(state);
  };

  const handleClickSymbol = (symbol) => {
    switch (symbol) {
    case '+':
    case '-':
    case '*':
    case '/':
      state.symbolCnt += 1;
      state.prev = symbol;

      if (state.symbolCnt > 0) {
        state.result = state.acc;
      }
      break;
    case '=':
      state.result = state.acc;
      state.prev = null;
      break;
    default:
    }

    render(state);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <span>{state.result}</span>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button type="button" onClick={() => handleClickNumber(num)}>
            {num}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((symbol) => (
          <button type="button" onClick={() => handleClickSymbol(symbol)}>
            {symbol}
          </button>
        ))}
      </p>
    </div>
  );

  getAppElement().textContent = '';
  getAppElement().appendChild(element);
}

render(initState);
