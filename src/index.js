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

let pre = 0;
let cur = 0;
let op = '';
let acc = null;

function render(count) {
  function handleNumberClick(val) {
    if (op === '') {
      cur = Number(cur + String(val));
      return render(cur);
    }
    cur = Number(cur + String(val));
    return render(cur);
  }
  function handleOperatorClick(oper) {
    if (oper === '=') {
      if (op === '+') {
        acc = (acc === null) ? (pre + cur) : (acc + cur);
      } else if (op === '-') {
        acc = (acc === null) ? (pre - cur) : (acc - cur);
      } else if (op === '*') {
        acc = (acc === null) ? (pre * cur) : (acc * cur);
      } else if (op === '/') {
        acc = (acc === null) ? (pre / cur) : (acc / cur);
      }
      op = null;
      pre = 0;
      cur = 0;
      return render(acc);
    }
    if (op !== '') {
      if (op === '+') {
        acc = (acc === null) ? (pre + cur) : (acc + cur);
      } else if (op === '-') {
        acc = (acc === null) ? (pre - cur) : (acc - cur);
      } else if (op === '*') {
        acc = (acc === null) ? (pre * cur) : (acc * cur);
      } else if (op === '/') {
        acc = (acc === null) ? (pre / cur) : (acc / cur);
      }
      op = oper;
      cur = 0;
      return render(acc);
    }
    op = oper;
    pre = cur;
    cur = 0;
    return render(count);
  }
  const element = (
    <div>
      <p>간단 계산기</p>

      <p>{count}</p>
      <p>
        {[...Array(10)].map((_, idx) => {
          if (idx === 9) {
            return (
              <button type="button" onClick={() => handleNumberClick(0)}>{0}</button>
            );
          }
          return (
            <button type="button" onClick={() => handleNumberClick((idx + 1))}>{idx + 1}</button>
          );
        })}
      </p>
      {['+', '-', '*', '/', '='].map((val) => (
        <button type="button" onClick={() => handleOperatorClick(val)}>{val}</button>
      ))}
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0);
