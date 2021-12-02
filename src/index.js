/* eslint-disable linebreak-style */
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

function render(result) {
  function onClickNum(n){
    render(n)
  }
  function onClickOper(s){
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <div id="result">{result}</div>
      <br />
      <div>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <button type="button" onClick={() => onClickNum(i)}>{i}</button>
        ))}
      </div>
      <br />
      <div>
        {['+', '-', '*', '/'].map((s) => (
          <button type="button" onClick={() => onClickOper(s)}>{s}</button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0);
