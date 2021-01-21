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

function render({ originNum, operator, addNum }) {
  const operatorFn = operator && {
    '+': originNum + addNum,
    '-': originNum - addNum,
    '*': originNum * addNum,
    '/': originNum / addNum,
  };

  function onClickOperator(operatorText) {
    return addNum ? render({
      originNum: operatorFn[operator], operator: operatorText,
    }) : render(
      { originNum, operator: operatorText },
    );
  }

  function onClickResultButton() {
    render({ originNum: operatorFn[operator], operator });
  }

  function onClickNumberButton(clickText) {
    return operator ? render({ originNum, operator, addNum: +`${addNum || ''}${clickText}` }) : render({ originNum: +`${originNum}${clickText}` });
  }

  const element = (
    <div>
      <p>간단계산기</p>
      <p>
        정답 :
        {addNum || originNum}
      </p>
      <p>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
            <button type="button" onClick={() => onClickNumberButton(number)}>{number}</button>
          ))
        }
      </p>
      <p>
        {
          ['+', '-', '*', '/'].map((operatorText) => (
            <button type="button" onClick={() => onClickOperator(operatorText)}>{operatorText}</button>
          ))
        }
        <button type="button" onClick={onClickResultButton}>=</button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ originNum: '' });
