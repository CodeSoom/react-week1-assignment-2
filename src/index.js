/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension */
/* @jsx createElement */

// eslint-disable-next-line no-unused-vars
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

function render({ number }) {
  function handleClickReset() {
    render({ 
      number: 0,
    });
  }
  function handleClickNumber(clickedNumber) {
    render({ 
      number: number * 10 + clickedNumber,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button type="button">
            {i}
          </button>
        ))}
      </p>
      <p>
        <button type="button" onClick={handleClickReset}>
          Reset
        </button>
      </p>
    </div>
  );

  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(element);
}

render({
  number: 0,
});
