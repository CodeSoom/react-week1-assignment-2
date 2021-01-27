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

function calculator(firstNum, secondNum, mark) {
  if (mark == '+') {
    return (firstNum + secondNum);
  } else if (mark == '-') {
    return (firstNum - secondNum);
  } else if (mark == '*') {
    return (firstNum * secondNum);
  } else if (mark == '/') {
    return (firstNum / secondNum); 
}

function render(firstNum = 0, secondNum = 0, mark = '') {
  function handleClick(count) {
    if (firstNum == 0) {
      firstNum = firstNum * 10 + count;
      render(firstNum, secondNum = 0, mark = '');
    } else {
      secondNum = secondNum * 10 + count;
      render(firstNum, secondNum, mark);
    }
  }
  function handleClickMark(mark) {
    render(firstNum, secondNum, mark);
  }

  function print(value) {
    if (secondNum == 0) {
      value = firstNum;
    } else if (mark == '=') {
      value = calculator(firstNum, secondNum, mark);
    } else {
      value = secondNum;
    } 
    render(firstNum, secondNum, mark);
  }  
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{print(value)}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(i => (
          <button type="button" onClick={() => handleClick(i)}>
            {i}
          </button>
        ))}  
      </p>
      <p>
        {['+', '-', '*', '/', '='].map(i => (
          <button type="button" onClick={() => handleClickMark(i)}>
            {i}
          </button>
        ))}  
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
