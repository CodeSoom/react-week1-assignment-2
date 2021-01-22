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

function calculate(operator, num1, num2) {
  if (operator === '+') {
    return num1 + num2;
  }
  if (operator === '-') {
    return num1 - num2;
  }
  if (operator === '/') {
    return num1 / num2;
  }
  if (operator === '*') {
    return num1 * num2;
  }
  return num2;
}

function render(number, arr = []) {
  function handleClickNumber(n) {
    if (arr.length === 0 || arr.length === 2) {
      arr.push(n);
      return render(n, arr);
    }

    const concatNumber = parseFloat(`${number}${n}`);
    arr.pop();
    arr.push(concatNumber);
    return render(concatNumber, arr);
  }

  function handleClickOperator(operator) {
    if (operator === '=' && arr.length === 3) {
      return render(calculate(arr[1], arr[0], arr[2]), []);
    }

    if (arr.length === 3) {
      const subResult = calculate(arr[1], arr[0], arr[2]);
      return render(subResult, [subResult, operator]);
    }

    return render(number, [number, operator]);
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => { handleClickNumber(i); }}>{i}</button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button type="button" onClick={() => { handleClickOperator(i); }}>{i}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0);
