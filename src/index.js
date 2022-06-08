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

const operatiorAction = {
  '+': (prev, current) => prev + current,
  '-': (prev, current) => prev - current,
  '*': (prev, current) => prev * current,
  '/': (prev, current) => Number((prev / current).toFixed(2)),
};

const initialState = {
  prev: 0,
  current: 0,
  showCurrent: false,
  operate: '',
  string: true,
};

function render() {
  // 숫자 배열화
  const numArr = new Array(10).fill().map((v, i) => (i + 1));
  numArr.splice(-1, 10, 0);
  // 연산자 배열화
  const operator = ['+', '-', '*', '/', '='];

  const handleNumber = (i) => {
    if (initialState.prev === 0) {
      initialState.prev = i;
    } else if (initialState.current === 0) {
      initialState.prev = Number(initialState.prev.toString() + i.toString());
    } else {
      initialState.current = i;
      initialState.showCurrent = true;
    }
    render();
  };

  const caculator = (operate, current, prev) => {
    if (operate === '=') {
      initialState.showCurrent = false;
      initialState.prev = operatiorAction[initialState.operate](prev, current);
    } else if (operate === '-') {
      initialState.current = -prev;
      initialState.prev = operatiorAction[operate](prev, current);
      initialState.showCurrent = false;
      initialState.operate = operate;
    } else {
      initialState.current = prev;
      initialState.prev = operatiorAction[operate](prev, current);
      initialState.showCurrent = false;
      initialState.operate = operate;
    }
    render();
  };

  console.log(initialState);

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{initialState.showCurrent ? initialState.current : initialState.prev}</p>
      <p>
        {numArr.map((i) => (
          <button type="button" onClick={() => { handleNumber(i); }}>{i}</button>
        ))}
      </p>
      <p>
        {operator.map((i) => (
          <button type="button" onClick={() => { caculator(i, initialState.current, initialState.prev); }}>{i}</button>
        ))}
      </p>
    </div>
  );

  // 불필요한 중복 제거
  const appHandler = document.getElementById('app');
  appHandler.textContent = '';
  appHandler.appendChild(element);
}

render();
