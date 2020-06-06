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

function render(count = '0', prev = '0', op, flag = false) {
  function showNum(i) {
    if (count === '0') {
      count = '';
    }
    if (flag === true) {
      count = '';
      flag = false;
    }

    render(count + i.toString(), prev, op, flag);
  }

  function operation(i) {
    flag = true;
    if (op === undefined) {
      op = i;
      render(count, count, op, flag);
    } else {
      if (op === '+') {
        prev = Number(prev) + Number(count);
      } else if (op === '-') {
        prev = Number(prev) - Number(count);
      } else if (op === '*') {
        prev = Number(prev) * Number(count);
      } else if (op === '/') {
        prev = Number(prev) / Number(count);
      } else if (op === '=') {
        render(prev, '0', undefined, false);
      }
      if (op !== '=') {
        render(prev, prev, i, flag);
      }
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{count}</p>
      <div>
        <p>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
              <button type="button" onClick={() => showNum(i)}>
                {i}
              </button>
            ))
          }
        </p>
      </div>
      <div>
        <p>
          {
            ['+', '-', '*', '/', '='].map((i) => (
              <button type="button" onClick={() => operation(i)}>
                {i}
              </button>
            ))
          }
        </p>
      </div>
    </div>

  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
