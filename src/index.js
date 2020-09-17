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

const remove = (array, index) => {
  return [...array].filter(( _, idx) => idx != index)
}

const calculator = (stack) => {
  let memo = ""
  stack.map((e) => memo += e)

  return new Function(`return (${memo})`)()
}

const getCurrentNum = (stack) => {
  let memo = "";
  [...stack].reverse().some((e, idx) => {
    if(/[0-9]/g.test(e)) memo = e + memo
    return /\+|\-|\*|\//g.test(e) && idx !== 0
  })
  return memo;
}

const reRender = (stack) => {
  const lastElemnt = stack.slice(-1)[0]

  if(/\+|\-|\*|\/|\=/g.test(lastElemnt)) {
    const caculatedNum = calculator(remove(stack, stack.length -1))
    render(
      [caculatedNum, lastElemnt],
      caculatedNum
    )
  } else {
    render(
      [...stack],
      getCurrentNum(stack)
    )
  }
}

function render(stack = [], currentNum = 0) {
  console.log(stack, currentNum)
  const element = (
    <div>
      <p>간단 계산기</p>
      <div>{currentNum}</div>
      <p>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <button type="button" onClick={() => ( reRender([...stack, num]) )}>
              {num}
            </button>
          ))
        }
      </p>
      <p>
        {
          ['+', '-', '*', '/', '='].map((operator) => (
            <button type="button" onClick={() => ( reRender([...stack, operator]) )}>
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
