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

function render({ count }) {
  function handleClickedNumber(event) {
    const clickedNumber = Number(event.target.value);
    render({ count: Number(`${count}${clickedNumber}`) });
  }

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{count}</p>
      <div>
        {numbers.map((number) => (
          <button type="button" value={number} onClick={handleClickedNumber}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );

  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(element);
}

render({ count: 0 });
