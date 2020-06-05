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

let result = 0;
let lhs = 0;
let rhs = -1;
let mark = '';

function handleClickNumber(value) {
  switch (mark) {
  case '+':
  case '-':
  case '*':
  case '/':
    if (rhs === 0 || rhs === -1) {
      rhs = value;
    } else {
      rhs = Number(String(rhs) + String(value));
    }
    result = rhs;
    render();
    break;
  default:
    if (lhs === 0) {
      lhs = value;
    } else {
      lhs = Number(String(lhs) + String(value));
    }
    result = lhs;
    render();
    break;
  }
}

function handleClickCalculationMark(value) {
  if (value === '=') { // When clicked '='
    switch (mark) {
    case '+':
      result = lhs + rhs;
      break;
    case '-':
      result = lhs - rhs;
      break;
    case '*':
      result = lhs * rhs;
      break;
    case '/':
      result = lhs / rhs;
      break;
    default:
      break;
    }
    lhs = 0;
    rhs = -1;
    mark = '';
    render();
  } else {
    // When clicked '+', '-', '*', '/'
    if (rhs > -1) {
      switch (mark) {
        case '+':
          result = lhs + rhs;
          break;
        case '-':
          result = lhs - rhs;
          break;
        case '*':
          result = lhs * rhs;
          break;
        case '/':
          result = lhs / rhs;
          break;
        default:
          break;
      }
      lhs = result;
      rhs = -1;
      render();
    }

    mark = value;
  }

}

function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{result}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((m) => (
          <button type="button" onClick={() => handleClickCalculationMark(m)}>
            {m}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
