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

const operatorFunctions = {
  '+': (originNum, addNum) => originNum + addNum,
  '-': (originNum, addNum) => originNum - addNum,
  '*': (originNum, addNum) => originNum * addNum,
  '/': (originNum, addNum) => originNum / addNum,
};

function numberMaker(numbers) {
  if (!Array.isArray(numbers)) return numbers;

  const lastNumberIndex = numbers.length - 1;

  return numbers.reduce((accumulrator, currentValue, index) => {
    const exponent = lastNumberIndex - index;
    const convertCurrentValue = index === lastNumberIndex
      ? currentValue : currentValue * 10 ** exponent;

    return accumulrator + convertCurrentValue;
  }, 0);
}

const initialState = { originNum: [], operator: null, addNum: [] };

function render({ originNum, operator, addNum } = initialState) {
  function onClickOperator(operatorText) {
    return operator && addNum.length !== 0
      ? render({
        originNum: operatorFunctions[operator](
          numberMaker(originNum),
          numberMaker(addNum),
        ),
        operator: operatorText,
        addNum: [],
      })
      : render({ originNum, operator: operatorText, addNum: [] });
  }

  function onClickResultButton() {
    render({
      originNum: operatorFunctions[operator](numberMaker(originNum), numberMaker(addNum)),
      operator,
      addNum: [],
    });
  }

  function onClickNumberButton(clickText) {
    const renderState = operator
      ? { originNum, operator, addNum: [...addNum, clickText] }
      : { originNum: [...originNum, clickText], addNum: [] };

    return render(renderState);
  }

  const element = (
    <div>
      <p>간단계산기</p>
      <p>
        정답 :
        {addNum.length !== 0 ? numberMaker(addNum) : numberMaker(originNum)}
      </p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button type="button" onClick={() => onClickNumberButton(number)}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/'].map((operatorText) => (
          <button type="button" onClick={() => onClickOperator(operatorText)}>
            {operatorText}
          </button>
        ))}
        <button type="button" onClick={onClickResultButton}>
          =
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
