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

function handleClickNumber(lhs, rhs, mark, value) {
  switch (mark) {
  case '+':
  case '-':
  case '*':
  case '/':
    const newRhs = rhs === 0 || rhs === -1 ? value : Number(String(rhs) + String(value));
    render(lhs, newRhs, mark);
    break;
  default:
    const newLhs = lhs === 0 || mark === '=' ? value : Number(String(lhs) + String(value));
    mark === '=' ? render(newLhs, rhs, '') : render(newLhs, rhs, mark);
    break;
  }
}

function handleClickCalculationMark(lhs, rhs, mark, value) {
  if (value === '=' || rhs > -1) {
    switch (mark) {
      case '+':
        render(lhs + rhs, -1, value);
        break;
      case '-':
        render(lhs - rhs, -1, value);
        break;
      case '*':
        render(lhs * rhs, -1, value);
        break;
      case '/':
        render(lhs / rhs, -1, value);
        break;
      default:
        break;
    }
  } else {
    render(lhs, rhs, value);
  }
}

function printNumber(lhs, rhs) {
  return rhs > -1 ? rhs : lhs
}

function render(lhs, rhs, mark) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{printNumber(lhs, rhs)}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(lhs, rhs, mark, i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((m) => (
          <button type="button" onClick={() => handleClickCalculationMark(lhs, rhs, mark, m)}>
            {m}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0, -1, '');
