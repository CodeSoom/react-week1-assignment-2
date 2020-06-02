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

function render({
  result = 0, left = '', right = '', op = '', displayValue = '0',
}) {
  const handleNumClick = (numStr) => {
    if (['+', '-', '*', '/'].includes(op)) {
      right += numStr;
      render({
        result, left, right, op, displayValue,
      });
      return;
    }
    left += numStr;
    render({
      result, left, right, op, displayValue,
    });
  };

  const handleOpClick = (opStr) => {
    op = opStr;
    render({
      result, left, right, op, displayValue,
    });
  };

  const handleResultClick = () => {
    displayValue = eval(left + op + right);
    left = result;
    render({
      result, left, right, op, displayValue,
    });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      l:
      {left}
      <br />
      r:
      {right}
      <br />
      op:
      {op}
      <br />
      dis:
      {displayValue}
      <br />
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (<button type="button" onClick={() => handleNumClick(num)}>{num}</button>))}
      </div>
      <div>
        {['+', '-', '*', '/'].map((op) => (<button type="button" onClick={() => handleOpClick(op)}>{op}</button>))}
        <button type="button" onClick={handleResultClick}>=</button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({});
