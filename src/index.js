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

function render() {
  const $title = (
    <div>
      <p>간단 계산기</p>
    </div>
  );

  const $display = (
    <h3 id="display">0</h3>
  );

  function handleClickNumber() {
    //
  }

  function handleClickOperator() {
    //
  }

  const $calculator = (
    <div>
      <p>
        {
          ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((number) => (
            <button type="button" onClick={handleClickNumber}>
              {number}
            </button>
          ))
        }
      </p>
      <p>
        {
          ['+', '-', '*', '/', '='].map((operator) => (
            <button type="button" onClick={handleClickOperator}>
              {operator}
            </button>
          ))
        }
      </p>
    </div>
  );

  const $app = document.getElementById('app');
  $app.textContent = '';
  $app.appendChild($title);
  $app.appendChild($display);
  $app.appendChild($calculator);
}

render();
