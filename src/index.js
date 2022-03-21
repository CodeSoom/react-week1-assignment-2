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

function render(result = [0]) {
  console.log('현재', result);
  function isNumberLast() {
    return Number.isInteger(result.slice(-1)[0]);
  }
  function numberStream(newResult, number) {
    const last = newResult.slice(-1)[0];
    if (isNumberLast()) {
      return newResult.map((num, index) => {
        if (index === newResult.length - 1) {
          return last * 10 + number;
        }
        return num;
      });
    }
    return newResult;
  }

  function onNumberClick(number) {
    const newResult = numberStream(result, number);
    if (isNumberLast()) {
      render(newResult);
    } else {
      render([...newResult, number]);
    }
  }
  function onSignClick(sign) {
    switch (sign) {
    case '+':
      break;
    default:
      break;
    }
    render([...result, sign]);
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{result}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => <button type="button" onClick={() => onNumberClick(i)}>{i}</button>)}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((sign) => <button type="button" onClick={() => onSignClick(sign)}>{sign}</button>)}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
