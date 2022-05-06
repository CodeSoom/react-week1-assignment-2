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

const calcInitNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function render(calcNum) {
  function handleNumberClick(num) {
    calcNum = `${calcNum}${num}`.replace(/(^0+)/, "");
    render(calcNum);
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <div>{calcNum}</div>
      {calcInitNumbers.map((num) => (
        <button type="button" onClick={() => handleNumberClick(num)}>
          {num}
        </button>
      ))}
    </div>
  );

  document.getElementById("app").textContent = "";
  document.getElementById("app").appendChild(element);
}

render(0);
