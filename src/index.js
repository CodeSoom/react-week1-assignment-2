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

function calculate(num1, num2, operator) {
  if (operator === '+') {
    return num1 + num2;
  }
  if (operator === '-') {
    return num1 - num2;
  }
  if (operator === '/') {
    return num1 / num2;
  }
  return num1 * num2;
}

function render(number, arr = []) {
  function handleClickNumber(n) {
    if (arr.length === 0 || arr.length === 2) {
      arr.push(n);
      return render(n, arr);
    }
    const newNumber = number.toString() + n.toString();
    arr.pop();
    arr.push(newNumber);
    return render(newNumber, arr);
  }

  function handleClickOperator(operator) {
    if (operator === '=') {
      if (arr.length === 3) {
        const num2 = arr.pop();
        const op = arr.pop();
        const num1 = arr.pop();
        return render(calculate(num1, num2, op).toString(), []);
      }
    }

    if (arr.length === 3) {
      const num2 = arr.pop();
      const op = arr.pop();
      const num1 = arr.pop();
      const subResult = calculate(num1, num2, op).toString();
      arr.push(subResult);
      arr.push(operator);
      return render(subResult, arr);
    }

    if (arr.length === 2) {
      arr.pop();
      arr.push(operator);
      return render(number, arr);
    }
    arr.push(operator);
    return render(number, arr);
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
