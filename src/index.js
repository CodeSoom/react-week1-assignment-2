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

const requiredData = {
  current: 0,
  reset: false,
  operator: '=',
  calculation: '',
};

function calculate(setting, current) {
  const { operator, calculation } = setting;
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };

  return operator === '=' ? current : operators[operator](calculation, current);
}

function displayNumberN(setting, number) {
  const { reset, current } = setting;
  return reset ? number : Number([current === 0 ? '' : current, number].join(''));
}

function clickNumber(setting, number) {
  const { operator } = setting;
  return {
    current: displayNumberN(setting, number),
    reset: false,
    operator,
    calculation: calculate(setting, number),
  };
}

function clickOperator(setting, operator) {
  const { calculation } = setting;
  return {
    current: calculation,
    reset: true,
    operator,
    calculation,
  };
}

function clickResult(setting) {
  const { calculation } = setting;
  return {
    current: calculation,
    reset: true,
    operator: '=',
    calculation: 0,
  };
}

function render(setting) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{setting.current}</p>
      <p>
        {[...Array(10).keys()].map((number) => (
          <button
            type="button"
            onClick={() => render(clickNumber(setting, number))}
          >
            {number}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/'].map((operator) => (
          <button
            type="button"
            onClick={() => render(clickOperator(setting, operator))}
          >
            {operator}
          </button>
        ))}
        <button type="button" onClick={() => render(clickResult(setting))}> = </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(requiredData);
