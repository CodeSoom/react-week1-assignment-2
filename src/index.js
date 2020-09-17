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

// -----------------------------------------------------------------
// numberList 는 operator 클릭 전까지 숫자값을 계속 담는 배열
// numberJoinList 는 operator 클릭시 numberList 에 있는 값을 전부 Join 해서 하나의 숫자로 만들고 인덱스에 담아주는 배열
// numberJoinList 안에는 operator 도 같이 들어감

const collectedNumber = {
  numberList: [],
  numberJoinList: [],
};

function render({ displayNumber }) {
  const { numberJoinList, numberList } = collectedNumber;

  const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operatorArray = ['+', '-', '*', '/'];

  function Calculate(prevNumber, operator, nextNumber) {
    if (operator === '+') return prevNumber + nextNumber;
    if (operator === '-') return prevNumber - nextNumber;
    if (operator === '*') return prevNumber * nextNumber;
    if (operator === '/') return prevNumber / nextNumber;
  }
  // 화면에 띄워줄 때 1의 자릿수와 2 이상의 자릿수를 가진 값을 분리해서 화면에 표시함.
  // 2 이상의 자릿수는 합쳐준 뒤에 화면에 표시해야되므로 나눠줌.
  const displayNumberController = () => {
    if (numberList.length > 1) {
      render({ displayNumber: numberList.join('') });
    } else if (numberList.length === 1) {
      render({ displayNumber: numberList[0] });
    }
  };
  // 숫자 버튼 클릭 시 배열에 담아주고, 화면에 띄워줌
  const handleClickNumber = ({ target: { textContent: number } }) => {
    numberList.push(number);
    displayNumberController(numberList);
  };
  // JoinNumber 배열길이가 3이 넘어가면 계산 후 계산한 값을 맨 처음으로 넣어주고 맨 끝 인덱스의 operator 를 두번째로 넣어줌
  const handleResult = ([prevNumber, operator, nextNumber], nextOperator) => {
    if (numberJoinList.length >= 3) {
      const value = Calculate(prevNumber, operator, nextNumber);
      collectedNumber.numberJoinList = [value, nextOperator];
      render({ displayNumber: value });
    }
    // 다음 계산에 사용되는 operator 가 " = " 일 때, 바로 계산해줌. 위와 동일하게 화면 표시 + 전체 배열을 초기화함.
    if (nextOperator === '=') {
      const value = Calculate(prevNumber, operator, nextNumber);
      render({ displayNumber: value });
      numberJoinList.splice(0);
    }
  };
  // operator 클릭시 Join 배열에 합쳐진 하나의 숫자를 넣음 / 이미 넣어준 숫자 배열은 초기화 함.
  const handleClickOperator = ({ target: { textContent: operator } }) => {
    numberJoinList.push(Number(numberList.join('')));
    numberList.splice(0);
    // operator 값을 숫자 넣은 후 그 다음에 이어 넣어줌.
    numberJoinList.push(operator);
    handleResult(numberJoinList, operator);
  };
  // "=" 버튼 클릭시 끝에 받아온 숫자를 바로 넣고 계산이 바로 돼도록 함.
  const handleClickEqual = ({ target: { textContent: equal } }) => {
    numberJoinList.push(Number(numberList.join('')));
    numberList.splice(0);

    handleResult(numberJoinList, equal);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <span>{displayNumber}</span>
      <hr />
      <div className="button_number_collection">
        {numberArray.map((number) => (
          <button type="button" onClick={(event) => handleClickNumber(event)}>
            {number}
          </button>
        ))}
      </div>
      <br />
      <div className="button_operator_collection">
        {operatorArray.map((operator) => (
          <button type="button" onClick={(event) => handleClickOperator(event)}>
            {operator}
          </button>
        ))}
        <button type="button" onClick={(event) => handleClickEqual(event)}>
          =
        </button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ displayNumber: 0 });
