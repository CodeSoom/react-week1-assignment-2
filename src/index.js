/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const rhsDefaultValue = -1;
const calculation = {
  '+': (lhs, rhs) => lhs + rhs,
  '-': (lhs, rhs) => lhs - rhs,
  '*': (lhs, rhs) => lhs * rhs,
  '/': (lhs, rhs) => lhs / rhs,
};

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

function printNumber(lhs, rhs) {
  return rhs > -1 ? rhs : lhs;
}

function render({
  lhs = 0,
  rhs = rhsDefaultValue,
  mark = '',
} = {}) {
  function handleClickCalculationMark(value) {
    if (value === '=' || rhs > rhsDefaultValue) {
      render({
        lhs: calculation[mark](lhs, rhs),
        rhs: rhsDefaultValue,
        mark: value,
      });
    } else {
      render({
        lhs,
        rhs,
        mark: value,
      });
    }
  }

  function handleClickNumber(value) {
    function checkRhsIfAddTail() {
      return rhs === 0 || rhs === rhsDefaultValue;
    }

    if (Object.prototype.hasOwnProperty.call(calculation, mark)) {
      render({
        lhs,
        rhs: checkRhsIfAddTail() ? value : (rhs * 10) + value,
        mark,
      });
    } else {
      render({
        lhs: lhs === 0 || mark === '=' ? value : (lhs * 10) + value,
        rhs,
        mark: mark === '=' ? '' : mark,
      });
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{printNumber(lhs, rhs)}</p>
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
