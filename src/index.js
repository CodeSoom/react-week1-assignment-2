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

const initialState = {
  number: 0,
  digits: [],
  userInputs: [],
};

const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

function render({ number, digits, userInputs }) {
  function handleWrongInput(operator) {
    if (userInputs.length === 2) {
      render({ number: userInputs[0], digits, userInputs });
      userInputs.splice(0);
      return;
    }
    if (userInputs.length === 0) {
      render({ number, digits, userInputs });
    }
    userInputs.splice(-1, 1, operator);
    render({ number, digits, userInputs });
  }

  function handleClickNumber(inputNumber) {
    digits.push(inputNumber);
    const newNumber = parseInt(digits.join(''), 10);
    render({ number: newNumber, digits, userInputs });
  }

  function handleClickOperator(operator) {
    if (digits.length === 0) {
      handleWrongInput(operator);
      render({ number, digits, userInputs });
    }

    // 이전에 입력된 숫자와 새로 입력된 연산자를 userInputs에 담는다.
    userInputs.push(parseInt(digits.join(''), 10));
    userInputs.push(operator);
    digits.splice(0);

    // * 계산하기 *
    // 숫자 -> '=' 순서로 입력된 경우
    if (operator === '=' && userInputs.length === 2) {
      handleWrongInput(operator);
      return;
    }

    if (userInputs.length > 3) {
      const result = operations[userInputs[1]](userInputs[0], userInputs[2]);
      // 숫자 -> 연산자 -> 숫자 -> '=' 순서로 입력된 경우
      if (operator === '=') {
        render({ number: result, digits, userInputs });
        userInputs.splice(0);
        return;
      }
      // 연속해서 숫자와 연산자를 입력하는 경우 중간 계산 결과 구하기
      userInputs.splice(0, 3, result);
      render({ number: result, digits, userInputs });
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <span id="screen">{number}</span>
      <br />
      <p id="numButtons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((numberValue) => (
          <button type="button" onClick={() => handleClickNumber(numberValue)}>
            {numberValue}
          </button>
        ))}
      </p>
      <p id="operatorButtons">
        {['+', '-', '*', '/', '='].map((operator) => (
          <button type="button" onClick={() => handleClickOperator(operator)}>
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(element);
}

render(initialState);
