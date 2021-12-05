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

function render(result = 0) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];

  function handleClickNumber(inputNumber) {
    const currentResult = document.getElementById('result').innerText;
    const inputResult = '';

    // currentResult가 0일 경우 입력한 값
    // currentResult가 0이 아닌 경우 현재 값에 뒤에 이어붙이기

    render(inputResult);
  }

  function handleClickOperator(inputNumber) {
    // switch
    // +, -, *, / 일때는 렌더를 새로 할 필요가 없음
    // = 일때는 render를 새로 해야 함
  }

  // render 가 필요할 때: 숫자를 눌렀을 때, = 연산자를 눌렀을 때

  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="result">{result}</p>
      <div>
        {numbers.map((number) => (
          <button
            type="button"
            value={number}
            onClick={() => handleClickNumber(number)}
          >
            {number}
          </button>
        ))}
      </div>
      <br />
      <div>
        {operators.map((operator) => (
          <button
            type="button"
            value={operator}
            onClick={() => handleClickOperator(operator)}
          >
            {operator}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
