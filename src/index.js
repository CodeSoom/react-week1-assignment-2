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
/**
 *
 * @param accumulate - 축적된 값
 *
 * @param currentNum - 현재 작성중인 값
 *
 * @param renderNum - 화면에 표시되는 값
 *
 * @param operator - 연산자 '+', '-', '*', '/', '=' 를 포함
 *
 */

function defaultFunctions(acc, cur) {
  return cur;
}

const operatorFunctions = {
  '+': (acc, cur) => acc + cur,
  '-': (acc, cur) => acc - cur,
  '*': (acc, cur) => acc * cur,
  '/': (acc, cur) => acc / cur,
};

function calc({ accumulate, currentNum, operator }) {
  return (operatorFunctions[operator] || defaultFunctions)(accumulate, currentNum);
}

const initialState = {
  accumulate: 0,
  currentNum: 0,
  renderNum: 0,
  operator: undefined,
};

function render({
  accumulate, currentNum, renderNum, operator,
}) {
  function handleClickNumber(value) {
    const current = +`${currentNum}${value}`;
    return render({
      accumulate, currentNum: current, renderNum: current, operator,
    });
  }
  function handleClickOperator(value) {
    if (value === '=') {
      return render({ ...initialState, renderNum: calc({ accumulate, currentNum, operator }) });
    }

    const calcNum = calc({ accumulate, currentNum, operator });
    return render({
      ...initialState, accumulate: calcNum, renderNum: calcNum, operator: value,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{renderNum}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button type="button" onClick={() => handleClickNumber(num)}>
            {num}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((oper) => (
          <button type="button" onClick={() => handleClickOperator(oper)}>
            {oper}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
