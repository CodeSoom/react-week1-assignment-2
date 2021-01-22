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


function render(number, arr = []) {
  function handleClickNumber(n) {
    if (number === 0) {
      arr.push(n);
      return render(n, arr);
    }
    const newNumber = number.toString() + n.toString();
    arr.pop();
    arr.push(newNumber);
    return render(newNumber, arr);
  }

  function handleClickOperator(operator, stack) {
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
          <button type="button" onClick="">{i}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0);
