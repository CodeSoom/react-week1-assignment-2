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

const compute = {
  '+': (num1, num2) => num1 + num2,
  '-': (num1, num2) => num1 - num2,
  '*': (num1, num2) => num1 * num2,
  '/': (num1, num2) => num1 / num2,
};

function computed(operator = '', num1 = 0, num2 = 0) {
  const result = (operator) ? compute[operator](num1, num2) : num1;
  // eslint-disable-next-line no-use-before-define
  render(0, result);
}

function render(calculator = { displayNumber: 0 }) {
  const element = (
    <div id="calculator" className="calcurating">
      <p>간단 계산기 by EHOTO</p>
      <p>
        { calculator.displayNumber }
      </p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => render({ displayNumber: calculator.displayNumber * 10 + i })}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {/* 사칙연산자 등록. 만약, [숫자, 연산자, 숫자]가 존재하면 사칙연산 결과값 출력 후 사칙연산자 등록. */}
        {['+', '-', '*', '/'].map((i) => (
          <button type="button" onClick={() => render()}>
            {i}
          </button>
        ))}
        {/* 첫 번째 및 두 번째 숫자에 대한 사칙연산 결과값 출력 */}
        <button type="button" onClick={() => render()}>
          =
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
