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

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operations = ['+', '-', '*', '/', '='];

function render(score = 0, prevNumber = '', nextNumber = '', prevOperaion = '') {
  function calculate(prevNum, nextNum, nextOper) {
    if (nextOper === '+') {
      return prevNum + nextNum;
    }

    if (nextOper === '-') {
      return prevNum - nextNum;
    }

    if (nextOper === '*') {
      return prevNum * nextNum;
    }

    if (nextOper === '/') {
      return prevNum / nextNum;
    }

    return false;
  }

  function handleClickNumber(number) {
    if (prevNumber === '') {
      render(number, number, nextNumber, prevOperaion);
      return;
    }

    if (prevOperaion === '') {
      render(
        parseInt(prevNumber + String(number), 10),
        parseInt(prevNumber + String(number), 10), nextNumber, prevOperaion,
      );
      return;
    }

    if (nextNumber === '') {
      render(number, prevNumber, number, prevOperaion);
      return;
    }

    render(
      parseInt(nextNumber + String(number), 10),
      prevNumber, parseInt(nextNumber + String(number), 10), prevOperaion,
    );
  }

  function handleClickOperation(operation) {
    if (prevOperaion === '') {
      render(score, prevNumber, nextNumber, operation);
      return;
    }

    if (operation === '=') {
      render(calculate(prevNumber, nextNumber, prevOperaion));
      return;
    }

    render(
      calculate(prevNumber, nextNumber, prevOperaion),
      calculate(prevNumber, nextNumber, prevOperaion), '', operation,
    );
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="score">{score}</p>
      <p>
        {
          numbers.map((number) => (
            <button type="button" onClick={() => handleClickNumber(number)}>{number}</button>
          ))
        }
      </p>
      <p>
        {
          operations.map((operation) => (
            <button type="button" onClick={() => handleClickOperation(operation)}>{operation}</button>
          ))
        }
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
