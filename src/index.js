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

const remove = (array, index) => [...array].filter((_, idx) => idx !== index);

const calculator = (stack) => {
  let memo = '';
  stack.forEach((e) => { memo += e; });

  return new Function(`return (${memo})`)();
};

const getCurrentNum = (stack) => {
  let memo = '';
  [...stack].reverse().some((e, idx) => {
    if (/[0-9]/g.test(e)) memo = e + memo;
    return /\+|-|\*|\//g.test(e) && idx !== 0;
  });
  return memo;
};


function render(stack = [], currentNum = 0) {
  const reRender = (pStack) => {
    const lastElemnt = pStack.slice(-1)[0];

    if (/\+|-|\*|\/|=/g.test(lastElemnt)) {
      const caculatedNum = calculator(remove(pStack, stack.length - 1));
      render(
        [caculatedNum, lastElemnt],
        caculatedNum,
      );
    } else {
      render(
        [...pStack],
        getCurrentNum(pStack),
      );
    }
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <div>{currentNum}</div>
      <p>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <button type="button" onClick={() => (reRender([...stack, num]))}>
              {num}
            </button>
          ))
        }
      </p>
      <p>
        {
          ['+', '-', '*', '/', '='].map((operator) => (
            <button type="button" onClick={() => (reRender([...stack, operator]))}>
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
