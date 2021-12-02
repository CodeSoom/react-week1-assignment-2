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

const OPERATIONS = ['+', '-', '*', '/', '='];

const { log } = console;

const result = 0;

function handleNumberClick(i) {
  log(i);
}

function handleOperationClick(operation) {
  log(operation);
}

function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{0}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (<button type="button" onClick={() => handleNumberClick(i)}>{i}</button>))}
      </p>
      <p>
        {OPERATIONS.map((operation) => (<button type="button" onClick={() => handleOperationClick(operation)}>{operation}</button>))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
