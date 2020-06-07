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

function calculate(operator, calculation, current) {
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };
  return operator === '=' ? current : operators[operator](calculation, current);
}

function displayNumberN(setting, number) {
  return setting.reset ? number : Number([setting.current === 0 ? '' : setting.current, number].join(''));
}

function displayNumberO(setting, operator) {
  if (setting.operator !== operator && operator !== '+' && setting.operator !== '-') {
    return setting.current;
  }
  return setting.calculation;
}

function clickNumber(setting, number) {
  const clickNumberSetting = { ...setting };
  clickNumberSetting.current = displayNumberN(setting, number);
  clickNumberSetting.reset = false;
  clickNumberSetting.calculation = calculate(setting.operator, setting.calculation, number);
  return clickNumberSetting;
}

function clickOperator(setting, operator) {
  const clickOperatorSetting = { ...setting };
  clickOperatorSetting.current = operator === '=' ? setting.calculation : displayNumberO(setting, operator);
  clickOperatorSetting.reset = true;
  clickOperatorSetting.operator = operator;
  clickOperatorSetting.calculation = operator === '=' ? 0 : setting.calculation;
  return clickOperatorSetting;
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
        {['+', '-', '*', '/', '='].map((operator) => (
          <button
            type="button"
            onClick={() => render(clickOperator(setting, operator))}
          >
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(requiredData);
