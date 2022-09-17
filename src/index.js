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

const initData = {
  result: 0,
  value: 0,
  operation: '',
};

const calculator = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
  '=': (x, y) => y,
  '': (x, y) => y,
};

function render({ result, value, operation } = initData) {
  function handleClickNumber(i) {
    const temp = value * 10 + i;
    render({ result, value: temp, operation });
  }

  function handleClickOperation(oper) {
    render({ result: calculator[operation](result, value), value: 0, operation: oper });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{value === 0 ? result : value}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>{i}</button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((oper) => (
          <button type="button" onClick={() => handleClickOperation(oper)}>{oper}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
