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
    render([
      calculator(remove(stack, stack.length -1))
    ])
  } else {
    render(stack)
  }
  return
}

const remove = (array, index) => {
  return [...array].filter(( _, idx) => idx != index)
}

const calculator = (stack) => {
  let memo = ""
  stack.map((e) => memo += e)

  return new Function(`return (${memo})`)()
}

function render(stack = []) {
  const result = stack.length == 0 ? 0 : getLastNum(stack)

  function getLastNum(array) {
    const lastElemnt = array.slice(-1)[0]
    
    if (/\+|\-|\*|\//g.test(lastElemnt)) {
      return array.slice(-2)[0]
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
