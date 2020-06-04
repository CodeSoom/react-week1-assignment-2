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
경우의 수 생각
[예제 1] + 5 = 5 = 5 / 0
1.1. 가장 처음에 연산자가 먼저 들어가는 경우 예외처리(반드시 처음 선택하는 건 숫자여야 함)
1.2. 두 번째 숫자가 null인 경우 예외 처리(계산하지 않음)
1.3. 계산 operator가 '='인 경우 예외 처리(operator에 값 넣지 않고 리턴)
1.4. 분모를 0으로 나누는 경우 계산 없이 무조건 에러 경고 alert 띄움.

[예제 2] 5 * 5 * (계산 결과 출력) 5 * (계산 결과 출력) 5 = (계산 결과 출력) 625
2.1. 첫 번째 계산(5 * 5 *) : (5 * 5) 계산 결과를 result에 저장
    이전 변수 값 : result = null, beforeNumber = 5, operator = *, afterNumber = 5
    이후 변수 값 : result = 25, beforeNumber = result, operator = null, afterNumber = null
    연산자 저장 : operator = *
2.2. 두 번째 계산 : (result * 5) 계산 결과를 result에 저장
    이전 변수 값 : result = 25, beforeNumber = 25, operator = *, afterNumber = 5
    이후 변수 값 : result = 125, beforeNumber = 125, operator = null, afterNumber = null
    연산자 저장 : operator = *
2.3. 세 번째 계산 : (result * 5) 계산 결과를 result에 저장
    이전 변수 값 : result = 125, beforeNumber = 125, operator = *, afterNumber = 5
    이후 변수 값 : result = 625, beforeNumber = 625, operator = null, afterNumber = null
    result 제외 모든 값 초기화 : result = 625, beforeNumber = null, operator = null, afterNumber = null

[예제 3] '=' 버튼을 눌러 계산 결과 출력 후 42 + 1 = 43
3.1. 첫 번째 계산(42 + 1) : (42 + 1) 계산 결과를 result에 저장
    연산자가 null인 상태에서 숫자를 계속 입력할 경우 beforeNumber의 단위를 10씩 증가('2' -> '4' = '24')
    연산자에 값이 있는 상태에서 숫자를 계속 입력할 경우 afterNumber의 단위를 10씩 증가('3' -> '6' -> '7' = '367')
    beforeNumber, operator, afterNumber 셋 다 값이 있는 상태에서 연산자 입력이 들어올 경우 계산
    연산자가 '='인 경우 result에 결과값 저장하고 다시 beforeNumber, operator, afterNumber 초기화
*/

function handleClick(value) {
  const count = value + 1; // 항등함수 사용
  return count;
}

function handleClickNumber(beforeNumber, operator, afterNumber, result, calculatorNumber) {
  /*
  작성 필요
  */
  return ([beforeNumber, operator, afterNumber, result, calculatorNumber]);
}

function render([beforeNumber, operator, afterNumber, result] = [null, null, null, null]) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{(result === null) ? <br /> : result}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((calculatorNumber) => (
          <button type="button" onClick={() => { render(handleClickNumber(beforeNumber, operator, afterNumber, result, calculatorNumber)); }}>
            {calculatorNumber}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button type="button" onClick={() => { render(handleClickNumber(i)); }}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
