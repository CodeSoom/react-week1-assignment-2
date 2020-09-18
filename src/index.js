/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension,
  no-unused-vars, linebreak-style */

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
const state = {
  score: 0,
  prevNumber: '',
  nextNumber: '',
  nextOperaion: '',
};

function render() {
  function onNumberClick(event) {
    const value = event.target.textContent;

    if (state.prevNumber === '') {
      state.prevNumber = parseInt(value, 10);
    } else if (state.nextOperaion === '') {
      state.prevNumber += value;
    }

    document.getElementById('score').textContent = state.prevNumber;
  }

  function onOperationClick(event) {
    const value = event.target.textContent;
    state.nextOperaion = value;
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="score">{state.score}</p>
      <p>
        {
          numbers.map((number) => (
            <button type="button" onClick={(event) => onNumberClick(event)}>{number}</button>
          ))
        }
      </p>
      <p>
        {
          operations.map((operation) => (
            <button type="button" onClick={(event) => onOperationClick(event)}>{operation}</button>
          ))
        }
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
