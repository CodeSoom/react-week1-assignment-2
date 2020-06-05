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
1.3. 계산 op가 '='인 경우 예외 처리(op에 값 넣지 않고 리턴)
1.4. 분모를 0으로 나누는 경우 계산 없이 무조건 에러 경고 alert 띄움.

[예제 2] 5 * 5 * (계산 결과 출력) 5 * (계산 결과 출력) 5 = (계산 결과 출력) 625
2.1. 첫 번째 계산(5 * 5 *) : (5 * 5) 계산 결과를 result에 저장
    이전 변수 값 : result = null, befNum = 5, op = *, aftNum = 5
    이후 변수 값 : result = 25, befNum = result, op = null, aftNum = null
    연산자 저장 : op = *
2.2. 두 번째 계산 : (result * 5) 계산 결과를 result에 저장
    이전 변수 값 : result = 25, befNum = 25, op = *, aftNum = 5
    이후 변수 값 : result = 125, befNum = 125, op = null, aftNum = null
    연산자 저장 : op = *
2.3. 세 번째 계산 : (result * 5) 계산 결과를 result에 저장
    이전 변수 값 : result = 125, befNum = 125, op = *, aftNum = 5
    이후 변수 값 : result = 625, befNum = 625, op = null, aftNum = null
    result 제외 모든 값 초기화 : result = 625, befNum = null, op = null, aftNum = null

[예제 3] '=' 버튼을 눌러 계산 결과 출력 후 42 + 1 = 43
3.1. 첫 번째 계산(42 + 1) : (42 + 1) 계산 결과를 result에 저장
    연산자가 null인 상태에서 숫자를 계속 입력할 경우 beforeNumber의 단위를 10씩 증가('2' -> '4' = '24')
    연산자에 값이 있는 상태에서 숫자를 계속 입력할 경우 afterNumber의 단위를 10씩 증가('3' -> '6' -> '7' = '367')
    befNum, op, aftNum 셋 다 값이 있는 상태에서 연산자 입력이 들어올 경우 계산
    연산자가 '='인 경우 result에 결과값 저장하고 다시 befNum, op, aftNum 초기화
*/

function fourPointOperation(befNum, op, aftNum) {
  // 덧셈
  if (op === '+') {
    const newResult = befNum + aftNum;
    return newResult;
  }
  // 뺄셈
  if (op === '-') {
    const newResult = befNum - aftNum;
    return newResult;
  }
  // 곱셈
  if (op === '*') {
    const newResult = befNum * aftNum;
    return newResult;
  }
  // 나눗셈
  const newResult = befNum / aftNum;
  return newResult;
}

function handleClickNumber(befNum, op, aftNum, calNum) {
  // 연산자를 입력하지 않고 첫 번째 숫자만 입력하고 있는 경우
  if (op === null) {
    const calNumStr = String(calNum);
    const befNumStr = String(befNum);
    const newBefNumStr = (befNum === null) ? calNumStr : (befNumStr + calNumStr);
    const newBefNum = parseInt(newBefNumStr, 10);
    return ([newBefNum, op, aftNum, newBefNum]);
  }

  // 첫 번째 숫자, 연산자 입력 후 두 번째 숫자만 입력하고 있는 경우
  const calNumStr = String(calNum);
  const aftNumStr = String(aftNum);
  const newAftNumStr = (aftNum === null) ? calNumStr : (aftNumStr + calNumStr);
  const newAftNum = parseInt(newAftNumStr, 10);
  return ([befNum, op, newAftNum, newAftNum]);
}

function handleClickOperator(befNum, op, aftNum, result, calOp) {
  // 숫자가 아닌 연산자부터 입력한 경우 에러 처리
  if (befNum === null && op === null && aftNum === null) {
    alert('계산기는 숫자부터 입력해야 합니다!');
    return ([befNum, op, aftNum, result]);
  }
  // 분모를 0으로 나누려 할 경우 에러 처리
  if (op === '/' && aftNum === 0) {
    alert('분모를 0으로 나눌 수 없습니다!');
    return ([null, null, null, null]);
  }
  // 연산자가 '='인 경우 에러 처리
  if (befNum !== null && op === null && aftNum === null && calOp === '=') {
    return ([befNum, op, aftNum, result]);
  }
  // 두 번째 숫자가 null인 경우 연산자 저장 후 리턴(계산 안함)
  if (befNum !== null && op === null && aftNum === null) {
    const newOp = calOp;
    return ([befNum, newOp, aftNum, result]);
  }
  // 첫 번째 숫자, 연산자, 두 번째 숫자에 모두 값이 있으면 계산
  const newResult = fourPointOperation(befNum, op, aftNum);
  // 입력 연산자가 '='인 경우 계산 결과 result에 집어넣고 연산 과정 초기화
  if (calOp === '=') return ([null, null, null, newResult]);
  // 입력 연산자가 '='이 아닌 경우 계산 결과는 첫 번째 연산자, calOp는 op에 집어넣고 계속
  return ([newResult, calOp, null, newResult]);
}

function render([befNum, op, aftNum, result] = [null, null, null, null]) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{(result === null) ? <br /> : result}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((calNum) => (
          <button type="button" onClick={() => { render(handleClickNumber(befNum, op, aftNum, calNum)); }}>
            {calNum}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((calOp) => (
          <button type="button" onClick={() => { render(handleClickOperator(befNum, op, aftNum, result, calOp)); }}>
            {calOp}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
