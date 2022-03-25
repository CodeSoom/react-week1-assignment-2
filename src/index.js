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
function render({ result = 0 }) {
  function handleClickNumber(value) {
    // 숫자 클릭시  숫자 를 count 에 보여줌.

    // 사칙연산 또는 =
    // 사칙연산 동작하고 숫자넣으면render()
  }
  function handleClickOperator(operator) {
    // TODO: ...계산
  }
  // 마지막 상태가 숫자인 경우
  // 1. 숫자가 들어온다
  // 2. 연산자가 들어온다
  // 3. 등호가 들어온다
  // 마지막 상태가 연산자인 경우
  // 1. 숫자가 들어온다
  // 2. 연산자가 들어온다
  // 3. 등호가 들어온다
  // 1-1 => 숫자를 잇는다
  // 1-2 =>
  // 이전 것들의 집합이 expression => 미리 계산하고 결과 보여줌
  // 이전 것들의 집합이 숫자 하나 => 그대로 숫자만 보여줌
  // 이전 상태값을 expression과 숫자로 구분지을 수 있도록 데이터 타입을 지정해야 한다
  // 2-1 다 지우고 지금 들어오는 숫자 표시
  // 2-2 =>
  // 연산자를 교체하는 방식
  // 기존의 연산자를 사용하는 방식
  // 1-3 =>
  // 이전 것들의 집합이 식 => 계산하고 결과 보여줌
  // 이전 것들의 집합이 숫자 하나 => 그대로 숫자만 보여줌
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
        {['+', '-', '*', '/', '='].map((operator) => (
          <button type="button" onClick={() => handleClickOperator(operator)}>
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ result: 0 });
