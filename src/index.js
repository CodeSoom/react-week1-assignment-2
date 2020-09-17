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

const reRender = (stack) => {
  const lastElemnt = stack.slice(-1)[0]

  if (lastElemnt === "=" && stack.length > 3) {
    const result = calculator(remove(stack, stack.length -1))
    render([result])
  } else {
    render(stack)
  }
  return
}

const remove = (array, index) => {
  return [...array].filter(( _, idx) => idx != index)
}

const calculator = (stack) => {
  return [999]
}

const plus = () => {

}

const minus = () => {

}

const divide = () => {

}

const multiply = () => {

}

function render(stack = []) {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];
  const result = stack.length == 0 ? 0 : getLastNum(stack)

  function getLastNum(_stack) {
    const arr = _stack
    const lastElemnt = arr.slice(-1)[0]
    if (/[+|-|*|/]/g.test(lastElemnt)) {
      return arr.slice(-2)[0]
    } else {
      return lastElemnt
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <div>{result}</div>
      <p>
        {
          nums.map((num) => (
            <button type="button" onClick={() => ( reRender([...stack, num]) )}>
              {num}
            </button>
          ))
        }
      </p>
      <p>
        {
          operators.map((operator) => (
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
