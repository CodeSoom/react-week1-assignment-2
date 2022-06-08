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

const initialState = {
  prev: 0,
  curreunt: 0,
  operate: false,
  operator: '',
};

function render() {
  // 숫자 배열화
  const numArr = new Array(10).fill().map((v, i) => (i + 1).toString());
  numArr.splice(-1, '10', '0');
  // 연산자 배열화
  const operator = ['+', '-', '*', '/', '='];

  // num : 현재 값
  const handleClickNumber = (currentNum, value) => {
    initialState.curreunt = value;
    if (currentNum === 0) {
      initialState.curreunt = value;
      render();
    } else if (!initialState.operate) {
      initialState.curreunt = Number(currentNum.toString() + value);
      render();
    }
    render();
  };

  const caculator = (operate) => {
    if (operate === '+') {
      initialState.prev = initialState.curreunt + initialState.prev;
      initialState.operate = true;
      initialState.operator = '+';
      render();
    } else if (initialState.operator === '+') {
      initialState.curreunt += initialState.prev;
      initialState.prev = 0;
      initialState.operator = '';
      render();
    } else if (operate === '*') {
      initialState.prev += initialState.curreunt;
      initialState.operate = true;
      initialState.operator = '*';
      render();
    } else if (initialState.operator === '*') {
      initialState.curreunt *= initialState.prev;
      initialState.prev = 0;
      initialState.operator = '';
      render();
    } else if (operate === '/') {
      initialState.prev += initialState.curreunt;
      initialState.operate = true;
      initialState.operator = '/';
      render();
    } else if (initialState.operator === '/') {
      initialState.curreunt = initialState.prev / initialState.curreunt.toFixed(1);
      initialState.prev = 0;
      initialState.operator = '';
      render();
    } else if (operate === '-') {
      initialState.prev += initialState.curreunt;
      initialState.operate = true;
      initialState.operator = '-';
      render();
    } else if (initialState.operator === '-') {
      initialState.curreunt = initialState.prev - initialState.curreunt;
      initialState.prev = initialState.curreunt;
      initialState.operator = '';
      render();
    }
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{initialState.curreunt}</p>
      <p>
        {numArr.map((i) => (
          <button type="button" onClick={() => { handleClickNumber(initialState.curreunt, Number(i)); }}>{i}</button>
        ))}
      </p>
      <p>
        {operator.map((i) => (
          <button type="button" onClick={() => { caculator(i); }}>{i}</button>
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
