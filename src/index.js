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

function render(state) {
  const calculator = {
    firstNum: 0,
    secondNum: 0,
    operator: undefined,
    result: 0,
  };

  if (!state) {
    state = { ...calculator };
  }

  const onClickNum = (num) => {
    state.firstNum = Number(state.firstNum.toString() + num.toString());
    state.result = state.firstNum;
    render(state);
  };

  const onClickOperator = (operator) => {
    state.operator = operator;
    state.secondNum = state.firstNum;
    state.firstNum = 0;
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{state.result}</p>
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button type='button' onClick={() => onClickNum(num)}>
            {num}
          </button>
        ))}
      </div>
      <p> </p>
      <div>
        {['+', '-', '*', '/', '='].map((operator) => (
          <button type='button' onClick={() => onClickOperator(operator)}>
            {operator}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
