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

const operatorList = {
  '+': (a, b) => Number(a) + Number(b),
  '-': (a, b) => Number(a) - Number(b),
  '*': (a, b) => Number(a) * Number(b),
  '/': (a, b) => Number(a) / Number(b),
};

function input(display = '0', acc = '', operators = [], operands = []) {
  return {
    display,
    acc,
    operators,
    operands,
  };
}
function numberClick(num, acc, operators, operands) {
  const result = [acc, num].join('');
  return input(result, result, operators, operands);
}

function operatorClick(operator, acc, operators, operands) {
  if (operators.length === 0) return input(acc, '', [operator], [acc]);
  const result = operatorList[operators.pop()](operands.pop(), acc);
  return input(result, '', [operator], [result]);
}

function render(obj = {
  display: 0, acc: '', operators: [], operands: [],
}) {
  const {
    display, acc, operators, operands,
  } = obj;
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{display}</p>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (<button type="button" onClick={() => render(numberClick(num, acc, operators, operands))}>{num}</button>))}
      <br />
      {['+', '-', '*', '/', '='].map((operator) => (<button type="button" onClick={() => render(operatorClick(operator, acc, operators, operands))}>{operator}</button>))}
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
