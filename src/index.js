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
  function isNumberLast() {
    return Number.isInteger(result.slice(-1)[0]);
  }
  function isCalculateDone() {
    return result.slice(-1)[0] === '=';
  }
  function getLastNumber() {
    let index = 0;
    result.forEach((element, i) => {
      if (Number.isInteger(element)) {
        index = i;
      }
    });
    return index;
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
    if (isCalculateDone()) {
      render([number]);
      return;
    }

    const newResult = numberStream(result, number);
    if (isNumberLast()) {
      render(newResult);
    } else {
      render([...newResult, number]);
    }
  }

  function onCalculate(newSign) {
    const sign = result[1];
    switch (sign) {
    case '+':
      return [result[0] + result[2], newSign];
    case '-':
      return [result[0] - result[2], newSign];
    case '*':
      return [result[0] * result[2], newSign];
    case '/':
      return [result[0] / result[2], newSign];
    default:
      return result;
    }
  }

  function onSignClick(sign) {
    if (!isNumberLast()) {
      const newResult = result.map((num, index) => {
        if (index === result.length - 1) {
          return sign;
        }
        return num;
      });
      render(newResult);
      return;
    }

    if (result.length >= 3) {
      const newReuslt = onCalculate(sign);
      render(newReuslt);
      return;
    }

    render([...result, sign]);
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{result[getLastNumber()]}</p>
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
