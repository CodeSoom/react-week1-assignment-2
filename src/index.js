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

function clickNumber(value) {
  console.log(value);
}

function clickOperator(value) {
  console.log(value);
}

function render() {
  const [zero, ...rest] = [...Array(10).keys()];
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {[...rest, zero].map((i) => (
          <button type="button" onClick={() => clickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((operator) => (
          <button type="button" onClick={() => clickOperator(operator)}>
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
