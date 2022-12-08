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

/* 
요구 사항
[] 숫자를 누르면 누른 숫자가 출력되어야 합니다.
[] 숫자를 연속해서 누르면 숫자가 더해져서 출력되어야 합니다.
[] 숫자와 연산자를 입력한 후 =를 클릭하면 계산 결과가 출력되어야 합니다.
[] 연속해서 숫자와 연산자를 입력하면 중간에 계산 결과가 출력되어야 합니다.

과제 하면서 느낀점
화면에 render 되는 순서를 생각하게 된다.
또 내부 함수에서만 state로 변수를 관리함으로써 안정성 있게 상태를 관리하는 법을 연습

*/

function render(state = { newNum: 0, lastNum: 0, operator: undefined }) {
  const onClickNum = (num) => {
    state.newNum = Number(state.newNum.toString() + num.toString());
    render(state);
  };

  const onClickOperator = (operator) => {
    state.operator = operator;
    state.lastNum = state.newNum;
    state.newNum = 0;
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{state.newNum}</p>
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button type='button' onClick={() => onClickNum(num)}>
            {num}
          </button>
        ))}
      </div>
      <p> </p> {/* 이 부분을 어떻게 표현하는게 맞을까? */}
      <div>
        {['+', '-', '*', '/', '='].map((operator) => (
          <button type='button' onClick={() => onClickOperator(operator)}>
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
