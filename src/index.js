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

const calculateNumber = (sign) => {
  switch (sign) {
  case '+':
    // 더한다
    break;
  case '-':
    // 뺀다
    break;
  case '*':
    // 나눈다
    break;
  case '/':
    // 더한다
    break;
  case '=':
    // 더한다
    break;
  default:
    // 아무것도 안 한다.
    break;
  }
};

// 1. 숫자를 누르면 누른 숫자가 출력되어야 합니다. (완료!)
// 2. 숫자를 연속해서 누르면 숫자가 더해져서 출력되어야 합니다. 힌트 한 번만 부탁드립니다...
// 3. 숫자와 연산자를 입력한 후 =를 클릭하면 계산 결과가 출력되어야 합니다.
// 4. 연속해서 숫자와 연산자를 입력하면 중간에 계산 결과가 출력되어야 합니다.

function render(result = 0) {
  const resultNumber = (a) => {
    render(a);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      {result}
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button
            type="button"
            onClick={() => {
              resultNumber(i);
            }}
          >
            {i}
          </button>
        ))}
        <div />
      </div>
      <div>
        {['+', '-', '*', '/', '='].map((i) => (
          <button type="button" onClick={() => { calculateNumber(i); }}>{i}</button>
        ))}
      </div>

    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
