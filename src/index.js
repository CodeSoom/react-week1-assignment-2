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

// 계산을 하는 로직이 들어있기에 operator(연산자) 보단 caculate(계산하다)가 잘 어울릴 것 같아 변경했습니다!
const calculator = {
  '+': (answer, choosedNumber) => answer + choosedNumber,
  '-': (answer, choosedNumber) => answer - choosedNumber,
  '*': (answer, choosedNumber) => answer * choosedNumber,
  '/': (answer, choosedNumber) => answer / choosedNumber,
  '=': (answer) => answer,
};

// 숫자 배열화(매개변수로 값을 받아 재활용할 수 있는 함수로 만들었습니다.)
const createNumbers = (length) => {
  // numbers의 초기값이 undefined로 채워지기에 사용하지 않는 매개변수는 _ 로 처리했습니다.
  const numbers = new Array(length).fill().map((_, i) => i + 1);
  numbers.splice(-1, 10, 0);
  return numbers;
};

function render({ answer = 0, selectedNumber, selectedOperator } = {}) {
  // 연산자 배열화
  const operators = ['+', '-', '*', '/', '='];

  // 결과값을 return 하는 함수
  const getAnswer = () => {
    if (selectedOperator) return calculator[selectedOperator](answer, selectedNumber);
    return selectedNumber;
  };

  // 숫자를 선택하는 함수
  const handleSelectNumber = (value) => {
    if (selectedNumber) {
      render({ answer, selectedNumber: Number(`${selectedNumber}${value}`), selectedOperator });
      return;
    }
    render({ answer, selectedNumber: value, selectedOperator });
  };

  // 계산을 하는 함수
  const handleSelectOperator = (value) => {
    render({ answer: getAnswer(), selectedOperator: value });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{selectedNumber || answer}</p>
      <p>
        {createNumbers(10).map((i) => (
          <button type="button" onClick={() => { handleSelectNumber(i); }}>{i}</button>
        ))}
      </p>
      <p>
        {operators.map((i) => (
          <button type="button" onClick={() => { handleSelectOperator(i); }}>{i}</button>
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
