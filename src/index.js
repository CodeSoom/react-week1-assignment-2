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

function render(param = { count: 0, prev: 0, op: undefined, flag: false }) {
  function showNum(i) {
    if (param.count === 0) return render({ count: i, prev: param.prev, op: param.op, flag: param.flag });
    if (param.flag === true) return render({ count: i, prev: param.prev, op: param.op, flag: false })
    return render({ count: Number(param.count + i.toString()), prev: param.prev, op: param.op, flag: param.flag });
  }

  function operator(i) {
    if (param.op === '+') return render({ count: param.prev + param.count, prev: param.prev + param.count, op: i, flag: true });
    if (param.op === '-') return render({ count: param.prev - param.count, prev: param.prev - param.count, op: i, flag: true });
    if (param.op === '*') return render({ count: param.prev * param.count, prev: param.prev * param.count, op: i, flag: true });
    if (param.op === '/') return render({ count: param.prev / param.count, prev: param.prev / param.count, op: i, flag: true });
    if (param.op === '=') return render({ count: prev, prev: 0, op: undefined, flag: false });
    return render({ count: 0, prev: 0, op: undefined, flag: false });
  }

  function operation(i) {
    if (param.op === undefined) return render({ count: param.count, prev: param.count, op: i, flag: true });
    if (param.op !== undefined) return operator(i);
    return render({ count: 0, prev: 0, op: undefined, flag: false });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{param.count}</p>
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
