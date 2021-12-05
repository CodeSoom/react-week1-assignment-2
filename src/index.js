/* eslint-disable linebreak-style */
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

function render({
  firstValue = '', secondValue = '', firstDone = false, secondDone = false, currentOperation = '', result = firstValue,
} = {}) {
  function doOperate() {
    const intValueA = Number(firstValue);
    const intValueB = Number(secondValue);
    const fundamentalOperation = {
      '+': intValueA + intValueB,
      '-': intValueA - intValueB,
      '/': intValueA / intValueB,
      '*': intValueA * intValueB,
    };
    return fundamentalOperation[currentOperation];
  }

  // 실제계산(doOperate)값을 처리하는 컨테이너
  function calculate(operation = '') {
    const answer = doOperate(operation);
    return render({
      result: answer, firstValue: String(answer), firstDone: true, secondValue: '', secondDone: false, currentOperation: operation,
    });
  }

  function onClickNumber(number) {
    // 첫번째 안끝났으면
    if (!firstDone) return render({ result: firstValue + number, firstValue: firstValue + number });
    // 두번째 계산 부터는
    return render({
      result: secondValue + number,
      firstValue,
      firstDone,
      secondValue: secondValue + number,
      secondDone: true,
      currentOperation,
    });
  }
  function onClickOperation(operation) {
    // '='이면 바로 계산
    if (operation === '=' && firstDone && secondDone) return calculate(currentOperation);

    // '='가 아닌경우
    /// /////////////// 필요없는데 render하게 되네?
    if (!firstDone) return render({ firstValue, firstDone: true, currentOperation: operation });
    if (firstDone && secondDone) {
      return calculate(operation);
    }
    return 0; // 의미없는 코드인데 왜 하기를 바라는걸까?
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <div id="result">{result}</div>
      <br />
      <div>
        {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map((number) => (
          <button type="button" onClick={() => onClickNumber(number)}>{number}</button>
        ))}
      </div>
      <br />
      <div>
        {['+', '-', '*', '/', '='].map((arithmetic) => (
          <button type="button" onClick={() => onClickOperation(arithmetic)}>{arithmetic}</button>
        ))}
      </div>
    </div>
  );
  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(element);
}

render({
  firstValue: '',
  secondValue: '',
  firstDone: false,
  secondDone: false,
  currentOperation: '',
  result: 0,
});
