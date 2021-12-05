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

function render({
  result,
  acc,
  symbolCnt,
  prev,
}) {
  const calculateAcc = (symbol, num) => {
    switch (symbol) {
    case '+':
      acc += num;
      prev = num;
      break;
    case '-':
      acc -= num;
      prev = num;
      break;
    case '*':
      acc *= num;
      prev = num;
      break;
    case '/':
      acc /= num;
      prev = num;
      break;
    case '=':
      break;
    default:
    }
  };

  const handleClickNumber = (num) => {
    switch (typeof prev) {
    case 'number': {
      const accNum = Number(`${prev}${num}`);

      result = accNum;
      acc = accNum;
      prev = accNum;
      break;
    }
    case 'string':
      calculateAcc(prev, num);
      break;
    case 'object': {
      result = num;
      acc = num;
      prev = num;
      break;
    }
    default:
    }

    render({
      result,
      acc,
      symbolCnt,
      prev,
    });
  };

  const handleClickSymbol = (symbol) => {
    switch (symbol) {
    case '+':
    case '-':
    case '*':
    case '/':
      symbolCnt += 1;
      prev = symbol;

      if (symbolCnt > 0) {
        result = acc;
      }
      break;
    case '=':
      result = acc;
      prev = null;
      break;
    default:
    }

    render({
      result,
      acc,
      symbolCnt,
      prev,
    });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <span>{result}</span>
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
