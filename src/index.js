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

function render(count = '0', prevCount = '0') {
  // 숫자 배열화
  const numArr = new Array(10).fill().map((v, i) => (i + 1).toString());
  numArr.splice(-1, '10', '0');
  // 연산자 배열화
  const operator = ['+', '-', '*', '/', '='];

  // 의도한대로 작동하나... 수정해야합니다...!
  function handleClickNumber(currentValue, value) {
    if (currentValue === '0') {
      render(value, value);
    } else {
      render(currentValue + value, value);
    }
  }

  // 정상작동하지 않음....(진행 중...!)
  function calculator(operate) {
    const NumberCount = Number(count);
    const NumberPrevCount = Number(prevCount);
    switch (operate) {
    case '+':
      render(NumberCount + NumberPrevCount, 0);
      break;
    case '-':
      render(NumberCount - NumberPrevCount, 0);
      break;
    case '*':
      render(NumberCount * NumberPrevCount, 0);
      break;
    case '/':
      render(NumberCount / NumberPrevCount, 0);
      break;
    default:
      break;
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{count}</p>
      <p>
        {numArr.map((i) => (
          <button type="button" onClick={() => { handleClickNumber(count, i); }}>{i}</button>
        ))}
      </p>
      <p>
        {operator.map((i) => (
          <button type="button" onClick={() => { calculator(i); }}>{i}</button>
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
