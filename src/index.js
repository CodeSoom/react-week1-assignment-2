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

function render(originNum = '', operator, addNum = '') {
  function onClickOperator(clickText) {
    const formatOriginNum = Number(originNum);
    const formatAddNum = Number(addNum);

    if (!operator) {
      return render(originNum, clickText);
    }

    if (operator === '+') {
      return render(formatOriginNum + formatAddNum, clickText);
    }

    if (operator === '-') {
      return render(formatOriginNum - formatAddNum, clickText);
    }

    if (operator === '*') {
      return render(formatOriginNum * formatAddNum, clickText);
    }

    if (operator === '/') {
      return render(formatOriginNum / formatAddNum, clickText);
    }
  }

  function onClickNumberButton(clickText) {
    return operator ? render(originNum, operator, addNum + clickText) : render(originNum + clickText);
  }


  const element = (
    <div>
      <p>간단계산기</p>
      <p>
        정답 :
        {originNum}
      </p>
      <p>
        {
          ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '='].map((text) => (
            <button type="button" onClick={() => (isNaN(Number(text)) ? onClickOperator(text) : onClickNumberButton(text))}>{text}</button>
          ))
        }
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
