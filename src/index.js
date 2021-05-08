/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

// 첫번째 커밋 : 계산기 외형 틀 완료 (연산 처리는 진행중)
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

function render({ result, operation }) {
  console.log(result, operation);
  const numberKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operatorKeys = ['+', '-', '*', '/', '='];

  function handleClickNumber(value) {
    if (operation != null) {
      render({ result: result * value });
      return;
    }
    render({ result: value });
  }

  function handleClickOperator(value) {
    render({ result, operation: value });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{result || 0}</p>
      <div>
        {numberKeys.map((key) => (
          <button id={`num${key}`} onClick={() => { handleClickNumber(key); }}>{key}</button>
        ))}
      </div>
      <div>
        {operatorKeys.map((key) => (
          <button id={`num${key}`} onClick={() => { handleClickOperator(key); }}>{key}</button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ result: 0 });
