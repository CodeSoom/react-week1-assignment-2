/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */


/*
requirements
1. 숫자를 누르면 누른 숫자가 출력되어야 합니다.
2. 숫자를 연속해서 누르면 숫자가 더해져서 출력되어야 합니다.
3. 숫자와 연산자를 입력한 후 =를 클릭하면 계산 결과가 출력되어야 합니다.
4. 연속해서 숫자와 연산자를 입력하면 중간에 계산 결과가 출력되어야 합니다.
*/

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
function click(cur, char, arr) {
  if (cur === 0) return render(char, char, arr);
  const value = [cur, char].join('');
  return render(value, value, arr);
}
function cal(cur, arr) {
  const a = parseInt(cur, 10);
  if (arr.length > 2) {
    const operand = arr.shift();
    const operator = arr.shift();
    switch (operator) {
    case '+': return render(0, operand + a, [operand + a, ...arr]);
    case '-': return render(0, operand - a, [operand - a, ...arr]);
    case '*': return render(0, operand * a, [operand * a, ...arr]);
    case '/': return render(0, operand / a, [operand / a, ...arr]);
    case '=': {
      switch (arr.pop()) {
      case '+': return render(operand + a, operand + a, []);
      case '-': return render(operand - a, operand - a, []);
      case '*': return render(operand * a, operand * a, []);
      case '/': return render(operand / a, operand / a, []);
      default: break;
      }
      break;
    }
    default: break;
    }
  }
  return render(0, +cur, [+cur, ...arr]);
}
function render(cur = 0, display = 0, arr = []) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <span>{display}</span>
      <button type="button" onClick={() => click(cur, 1, arr)}>1</button>
      <button type="button" onClick={() => click(cur, 2, arr)}>2</button>
      <button type="button" onClick={() => click(cur, 3, arr)}>3</button>
      <button type="button" onClick={() => click(cur, 4, arr)}>4</button>
      <button type="button" onClick={() => click(cur, 5, arr)}>5</button>
      <button type="button" onClick={() => click(cur, 6, arr)}>6</button>
      <button type="button" onClick={() => click(cur, 7, arr)}>7</button>
      <button type="button" onClick={() => click(cur, 8, arr)}>8</button>
      <button type="button" onClick={() => click(cur, 9, arr)}>9</button>
      <button type="button" onClick={() => click(cur, 0, arr)}>0</button>
      <br />
      <button type="button" onClick={() => cal(cur, [...arr, '+'])}>+</button>
      <button type="button" onClick={() => cal(cur, [...arr, '-'])}>-</button>
      <button type="button" onClick={() => cal(cur, [...arr, '*'])}>*</button>
      <button type="button" onClick={() => cal(cur, [...arr, '/'])}>/</button>
      <button type="button" onClick={() => cal(cur, [...arr, '='])}>=</button>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
