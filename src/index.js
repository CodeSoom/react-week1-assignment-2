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

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const marks = {
  plusCount: '+', minusCount: '-', multiCount: '*', diviCount: '/', result: '=',
};
const operators = ['+', '-', '*', '/', '='];
// 어떤 게 더 나은 방법일까?

// 반복되는 부분이 있다!
function render({ number = 0, mark, preNumber = 0 } = {}) {
  function handleClickNumber(numberValue, markValue, preNumberValue) {
    if (numberValue !== 0) {
      return render({ number: parseInt(`${number}${numberValue}`, 10), mark: markValue, preNumber: preNumberValue });
    }
    return render({ number: numberValue, mark: markValue, preNumber: preNumberValue });
  }

  function handleClickMark(numberValue, markValue, preNumberValue) {
    // 이 부분 함수로 빼야 할 듯.
    if (mark === marks.plusCount) {
      // 123 + 123 - 123
      return render({ number: numberValue + preNumberValue, mark: markValue });
    }
    if (mark === marks.minusCount) {
      return render({ number: numberValue - preNumberValue, mark: markValue });
    }
    if (mark === marks.multiCount) {
      return render({ number: numberValue * preNumberValue, mark: markValue });
    }
    if (mark === marks.diviCount) {
      return render({ number: numberValue / preNumberValue, mark: markValue });
    }
    return render({ mark: markValue, preNumber: numberValue });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number}</p>
      <p>
        {numbers.map((i) => (
          <button type="button" onClick={() => handleClickNumber(i, mark, preNumber)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {operators.map((i) => (
          <button type="button" onClick={() => handleClickMark(number, i, preNumber)}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );
  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(element);
}

render({ number: 0, mark: '', preNumber: 0 });
