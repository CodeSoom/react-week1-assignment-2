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

function render(count = '0', prev = '0', op = undefined, flag = false) {
  function showNum(i) {
    if (count === '0') return render(i.toString(), prev, op, flag);
    if (flag === true) return render(i.toString(), prev, op, false);
    return render(count + i.toString(), prev, op, flag);
  }

  function operator(i) {
    if (op === '+') return render(Number(prev) + Number(count), Number(prev) + Number(count), i, true);
    if (op === '-') return render(Number(prev) - Number(count), Number(prev) - Number(count), i, true);
    if (op === '*') return render(Number(prev) * Number(count), Number(prev) * Number(count), i, true);
    if (op === '/') return render(Number(prev) / Number(count), Number(prev) / Number(count), i, true);
    if (op === '=') return render(prev, '0', undefined, false);
    return render('0', '0', undefined, false);
  }

  function operation(i) {
    if (op === undefined) return render(count, count, i, true);
    if (op !== undefined) return operator(i);
    return render('0', '0', undefined, false);
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
