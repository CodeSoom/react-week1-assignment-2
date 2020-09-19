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

function render(stack = [], currentNum = 0) {
  const calculator = (pStack, pOperator) => {
    const nStack = [];
    const [num1, operator, num2] = pStack;

    if (operator) {
      nStack.push(MathConvertor[operator](num1, num2));
      nStack.push(pOperator);
    } else {
      nStack.push(num1);
      nStack.push(pOperator);
    }

    render(nStack, nStack[0]);
  };

  const combineNum = (pStack, pCurrentNum) => {
    const nStack = [...pStack];
    const lastElement = stack.slice(-1)[0];

    if (pStack.length < 1 || /\+|-|\*|\/|=/g.test(lastElement)) {
      nStack.push(pCurrentNum);
    } else {
      nStack.push(nStack.pop() * 10 + pCurrentNum);
    }

    render(nStack, nStack.slice(-1)[0]);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <div>{currentNum}</div>
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
