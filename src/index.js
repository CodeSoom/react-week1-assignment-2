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

function render(currentNum = 0, currentOperator = "", operand = 0) {
  console.log(`현재 상태: ${currentNum} ${currentOperator} ${operand}`);

  // ui 요소 데이터
  const numsPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ["+", "-", "*", "/", "="];

  // 숫자 클릭 이벤트
  const handleNum = (e) => {
    const clickedNum = e.target.innerText;

    if (currentOperator === "") {
      return currentNum === 0
        ? render(clickedNum)
        : render(currentNum + clickedNum);
    }

    return render(
      currentNum,
      currentOperator,
      (operand = operand + clickedNum)
    );
  };

  // 연산자 클릭 이벤트
  const handleOperator = (e) => {
    const clickedOp = e.target.innerText;
    const cal = `${currentNum} ${currentOperator} ${operand}`;
    /* const 연산한값 = 연산(cal); */

    if (clickedOp === "=") {
      /**
       * 연산자 = 을 클릭했을 때
       * 피연산자가 존재한다면 연산한 값 반환
       * 피연산자가 존재하지 않는다면 현재 숫자 반환
       * return operand ? render(연산한값) : render(currentNum);
       *  */
    }

    if (operand !== 0) {
      /**
       * = 이 아닌 다른 연산자 클릭했을 때
       * 피연산자가 존재한다면
       * 연산한값과 현재 클릭한 연산자를 반환
       * return render(연산한값, clickedOp)
       */
    }

    /* 현재 숫자만 있을 경우 클릭한 연산자와 함께 반환 */
    return render(currentNum, (currentOperator = clickedOp));
  };

  // 초기화 버튼 클릭 이벤트
  const clearData = () => {
    console.clear();
    render();
  };

  // ui 요소
  const element = (
    <div>
      <p>간단 계산기</p>
      <div>{currentNum}</div>
      <hr />
      {numsPad.map((num) => (
        <button
          onClick={(e) => {
            handleNum(e);
          }}
        >
          {num}
        </button>
      ))}
      <br />
      {operators.map((operator) => (
        <button
          onClick={(e) => {
            handleOperator(e);
          }}
        >
          {operator}
        </button>
      ))}
      <button onClick={clearData}>Clear</button>
    </div>
  );

  document.getElementById("app").textContent = "";
  document.getElementById("app").appendChild(element);
}

render();
