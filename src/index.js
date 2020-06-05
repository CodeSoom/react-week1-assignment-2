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

function add(operands) {
  return operands[0] + operands[1];
}
function sub(operands) {
  return operands[0] - operands[1];
}
function multi(operands) {
  return operands[0] * operands[1];
}
function div(operands) {
  return operands[0] / operands[1];
}
const operation = {
  '+': add,
  '-': sub,
  '*': multi,
  '/': div,
};

function NumberUnit(number) {
  if (typeof number === 'number') {
    return number;
  }
  return 0;
}
function attatchNumber(...units) {
  return NumberUnit(units[0]) * 10 + NumberUnit(units[1]);
}
function clickNumber(formula, number) {
  const { operands, calculator } = formula;
  const lastIndex = operands.length - 1;

  if (typeof calculator === 'function' && operands.length === 1) {
    return { operands: [operands[0], number], calculator };
  }
  return {
    operands:
      operands
        .slice(0, lastIndex)
        .concat(attatchNumber(operands[lastIndex], number)),
    calculator,
  };
}

function clickSign(formula, sign) {
  const { operands, calculator } = formula;
  if (operands.length === 0) {
    return { operands, calculator: undefined };
  }
  if (typeof calculator === 'function' && operands.length === 2) {
    return { operands: [calculator(operands)], calculator: operation[sign] };
  }
  return { operands, calculator: operation[sign] };
}

function Button(name, callback) {
  return <button type="button" onClick={callback}>{name}</button>;
}

function render(formula = { operands: [0], calculator: undefined }) {
  const { operands } = formula;
  const display = operands[operands.length - 1];
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{display}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(
          (i) => Button(i, () => render(clickNumber(formula, i))),
        )}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((sign) => Button(sign, () => render(clickSign(formula, sign))))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
