/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* eslint no-use-before-define: ["error", { "functions": false }] */

/* @jsx createElement */

const rhsDefaultValue = -1;

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
  case '/': {
    const newRhs = checkRhsIfAddTail() ? value : (rhs * 10) + value;
    render(lhs, newRhs, mark);
    break;
  }
  default: {
    const newLhs = lhs === 0 || mark === '=' ? value : (lhs * 10) + value;
    if (mark === '=') {
      render(newLhs, rhs, '');
    } else {
      render(newLhs, rhs, mark);
    }
    break;
  }
  }

  function checkRhsIfAddTail() {
    return rhs === 0 || rhs === rhsDefaultValue;
  }
}

function handleClickCalculationMark(lhs, rhs, mark, value) {
  if (value === '=' || rhs > -1) {
    if (mark === '+') render(lhs + rhs, rhsDefaultValue, value);
    if (mark === '-') render(lhs - rhs, rhsDefaultValue, value);
    if (mark === '*') render(lhs * rhs, rhsDefaultValue, value);
    if (mark === '/') render(lhs / rhs, rhsDefaultValue, value);
  } else {
    render(lhs, rhs, value);
  }
}

function printNumber(lhs, rhs) {
  return rhs > -1 ? rhs : lhs;
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

render(0, rhsDefaultValue, '');
