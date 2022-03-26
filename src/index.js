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
 * 작성이 완료된 값,
 * 보통 operator 를 입력하는 순간 currnetNum 이 prevNum 으로 변한다.
 * @param prevNum
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

function calc({ prevNum, currentNum, operator }) {
  return (operatorFunctions[operator] || defaultFunctions)(prevNum, currentNum);
}

function render({
  prevNum = 0, currentNum = 0, renderNum = 0, operator,
}) {
  function handleClickNumber(value) {
    const current = +`${currentNum}${value}`;
    return render({
      prevNum, currentNum: current, renderNum: current, operator,
    });
  }
  function handleClickOperator(value) {
    if (value === '=') {
      return render({ renderNum: calc({ prevNum, currentNum, operator }) });
    }

    const calcNum = calc({ prevNum, currentNum, operator });
    return render({
      prevNum: calcNum, renderNum: calcNum, operator: value,
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

render({});
