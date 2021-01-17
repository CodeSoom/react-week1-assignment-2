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

const MathConvertor = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

function render(stack = [], showingNum = 0) {
  const calculator = (pStack, pInputOp) => {
    const nStack = [];
    const [num1, operator, num2] = pStack;

    if (operator) {
      const concated = nStack.concat([
        MathConvertor[operator](num1, num2),
        pInputOp,
      ]);
      render(concated, concated[0]);
      return;
    }

    const concated = nStack.concat([num1, pInputOp]);
    render(concated, concated[0]);
  };

  const combineNum = (pStack, pInputNum) => {
    const lastIdx = pStack.length - 1;

    if (pStack.length < 1 || /\+|-|\*|\/|=/g.test(pStack[lastIdx])) {
      const concated = pStack.concat(pInputNum);
      render(concated, concated[concated.length - 1]);
      return;
    }

    const removedLastNum = [...pStack].splice(lastIdx, 0);
    const concated = removedLastNum.concat(pStack[lastIdx] * 10 + pInputNum);
    render(concated, concated[concated.length - 1]);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <div>{showingNum}</div>
      <p>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <button type="button" onClick={() => (combineNum(stack, num))}>
              {num}
            </button>
          ))
        }
      </p>
      <p>
        {
          ['+', '-', '*', '/', '='].map((operator) => (
            <button type="button" onClick={() => (calculator(stack, operator))}>
              {operator}
            </button>
          ))
        }
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
