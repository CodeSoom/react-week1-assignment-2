/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    if (key.includes('-')) {
      element.setAttribute(key.toLowerCase(), value);
      return;
    }
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
  const element = (
    <section className="calculator">
      <h1>간단 계산기</h1>
      <div className="calculator__display" />
      <ul className="calculator__numbers">
        {[...Array(9).keys()].map((_, index) => {
          const number = (index + 1) % 10;
          return (
            <li data-key={number}>
              <button type="button" aria-label={number}>
                {number}
              </button>
            </li>
          );
        })}
      </ul>
      <ul className="calculator__numbers">
        <li data-key="+">
          <button type="button" aria-label="plus">
            +
          </button>
        </li>
        <li data-key="-">
          <button type="button" aria-label="minus">
            -
          </button>
        </li>
        <li data-key="*">
          <button type="button" aria-label="multiply">
            *
          </button>
        </li>
        <li data-key="/">
          <button type="button" aria-label="divide">
            /
          </button>
        </li>
        <li data-key="=">
          <button type="button" aria-label="equals">
            =
          </button>
        </li>
      </ul>
    </section>
  );

  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(element);
}

render();
