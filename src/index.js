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

function isFirstMaxDigits(input) {
  const { first, symbol, second } = input;
  const MAX_DIGITS = 100000000000000;
  const firstAbs = (first === null) ? 0 : Math.abs(first);
  return (firstAbs >= MAX_DIGITS && (symbol === null && second === null));
}

function isSecondMaxDigits(second) {
  const MAX_DIGITS = 100000000000000;
  const secondAbs = (second === null) ? 0 : Math.abs(second);
  return (secondAbs >= MAX_DIGITS);
}

function isClickFirst(input) {
  const { symbol, second } = input;
  return (symbol === null && second === null);
}

function handleClickNumber(input, number) {
  const { first, symbol, second } = input;

  // 첫 번째 연산자가 15자리를 초과하는 경우 에러 처리
  if (isFirstMaxDigits(input)) {
    alert('숫자는 15자리를 초과하여 입력할 수 없습니다!');
    const newInput = {
      first, symbol, second, result: first,
    };
    return (newInput);
  }

  // 두 번째 연산자가 15자리 이상인 경우 에러 처리
  if (isSecondMaxDigits(second)) {
    alert('숫자는 15자리를 초과하여 입력할 수 없습니다!');
    const newInput = {
      first, symbol, second, result: second,
    };
    return (newInput);
  }

  // 첫 번째 숫자를 입력한 경우
  if (isClickFirst(input)) {
    const newFirst = (first === null) ? number : ((first * 10) + number);
    const newInput = {
      first: newFirst, symbol, second, result: newFirst,
    };
    return (newInput);
  }

  // 첫 번째 숫자, 연산자 입력 후 두 번째 숫자만 입력하고 있는 경우
  const newSecond = (second === null) ? number : ((second * 10) + number);
  const newInput = {
    first, symbol, second: newSecond, result: newSecond,
  };
  return (newInput);
}

function isFirstInputOperator(input) {
  const { first, operator, second } = input;
  return (first === null && operator === null && second === null);
}

function isDenominatorZero(input) {
  const { symbol, second } = input;
  return (symbol === '/' && second === 0);
}

function isSymbolEquality(input, operator) {
  const { first, symbol, second } = input;
  return (first !== null && symbol === null && second === null && operator === '=');
}

function isAfterNumberNull(input) {
  const { first, symbol, second } = input;
  return (first !== null && symbol === null && second === null);
}

function fourPointOperation(input) {
  const { first, symbol, second } = input;
  const fourPoint = {
    '+': first + second,
    '-': first - second,
    '*': first * second,
    '/': first / second,
  };
  return fourPoint[symbol];
}

function handleClickOperator(input, operator) {
  const { first, second, result } = input;

  // 숫자가 아닌 연산자부터 입력한 경우 에러 처리
  if (isFirstInputOperator(input)) {
    alert('계산기는 숫자부터 입력해야 합니다!');
    return (input);
  }
  // 분모를 0으로 나누려 할 경우 에러 처리
  if (isDenominatorZero(input)) {
    alert('분모를 0으로 나눌 수 없습니다!');
    const newInput = {
      first: null, symbol: null, second: null, result: null,
    };
    return (newInput);
  }
  // 연산자가 '='인 경우 에러 처리
  if (isSymbolEquality(input, operator)) {
    return (input);
  }
  // 두 번째 숫자가 null인 경우 연산자 저장 후 리턴(계산 안함)
  if (isAfterNumberNull(input)) {
    const newInput = {
      first, symbol: operator, second, result,
    };
    return (newInput);
  }

  // 첫 번째 숫자, 연산자, 두 번째 숫자에 모두 값이 있으면 계산
  const operation = fourPointOperation(input);
  const operationEnd = {
    first: null, symbol: null, second: null, result: operation,
  };
  const operationContinue = {
    first: operation, symbol: operator, second: null, result: operation,
  };

  // 입력 연산자가 '='이면 계산 종료, 아니면 계속 진행
  return ((operator === '=') ? operationEnd : operationContinue);
}

function render(input = {
  first: null, symbol: null, second: null, result: null,
}) {
  const { result } = input;
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{(result === null) ? <br /> : result}</p>
      <p>
        {numbers.map((number) => (
          <button type="button" onClick={() => { render(handleClickNumber(input, number)); }}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {operators.map((operator) => (
          <button type="button" onClick={() => { render(handleClickOperator(input, operator)); }}>
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
