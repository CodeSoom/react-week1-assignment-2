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

function render(param = {
  count: 0, prev: 0, op: undefined, flag: false,
}) {
  const {
    count, prev, op, flag,
  } = param;

  function showNum(i) {
    if (count === 0) {
      return render({
        ...param, count: i,
      });
    }
    if (flag === true) {
      return render({
        ...param, count: i, flag: false,
      });
    }
    return render({
      ...param, count: Number(count + i.toString()),
    });
  }

  function operator(clickedOp) {
    const opFlag = { op: clickedOp, flag: true };
    if (op === '+') {
      return render({
        count: prev + count, prev: prev + count, ...opFlag,
      });
    }
    if (op === '-') {
      return render({
        count: prev - count, prev: prev - count, ...opFlag,
      });
    }
    if (op === '*') {
      return render({
        count: prev * count, prev: prev * count, ...opFlag,
      });
    }
    if (op === '/') {
      return render({
        count: prev / count, prev: prev / count, ...opFlag,
      });
    }
    if (op === '=') {
      return render({
        count: prev, prev: 0, flag: false,
      });
    }
    return render({
      count: 0, prev: 0, flag: false,
    });
  }

  function operation(clickedOp) {
    if (!op) {
      return render({
        ...param, prev: count, op: clickedOp, flag: true,
      });
    }
    if (op) return operator(clickedOp);
    return render({
      count: 0, prev: 0, op: undefined, flag: false,
    });
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
