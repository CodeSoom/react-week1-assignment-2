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

const operatiorAction = {
  '+': (answer, choicedNumber) => answer + choicedNumber,
  '-': (answer, choicedNumber) => answer - choicedNumber,
  '*': (answer, choicedNumber) => answer * choicedNumber,
  '/': (answer, choicedNumber) => answer / choicedNumber,
  '=': (answer) => answer,
};

function render({ answer = 0, choicedNumber, operator } = {}) {
  // 숫자 배열화(매개변수로 값을 받아 재활용할 수 있는 함수로 만들었습니다.)
  const createNumArr = (length) => {
    // numArr의 초기값이 undefined로 채워지기에 사용하지 않는 매개변수는 _ 로 처리했습니다.
    const numArr = new Array(length).fill().map((_, i) => i + 1);
    numArr.splice(-1, 10, 0);
    return numArr;
  };

  // 연산자 배열화
  const operatorArr = ['+', '-', '*', '/', '='];

  // 결과값을 return 하는 함수
  const getAnswer = () => {
    if (operator) return operatiorAction[operator](answer, choicedNumber);
    return choicedNumber;
  };

  // 숫자를 선택하는 함수
  const handleClickChoiceNumber = (value) => {
    if (choicedNumber) {
      render({ answer, choicedNumber: Number(`${choicedNumber}${value}`), operator });
      return;
    }
    render({ answer, choicedNumber: value, operator });
  };

  // 계산을 하는 함수
  const handleClickOperator = (value) => {
    render({ answer: getAnswer(), operator: value });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{choicedNumber || answer}</p>
      <p>
        {createNumArr(10).map((i) => (
          <button type="button" onClick={() => { handleClickChoiceNumber(i); }}>{i}</button>
        ))}
      </p>
      <p>
        {operatorArr.map((i) => (
          <button type="button" onClick={() => { handleClickOperator(i); }}>{i}</button>
        ))}
      </p>
    </div>
  );

  // 불필요한 중복 제거
  const appHandler = document.getElementById('app');
  appHandler.textContent = '';
  appHandler.appendChild(element);
}

render();
