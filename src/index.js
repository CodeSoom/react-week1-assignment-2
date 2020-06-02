/* eslint no-eval: 0 */
/* eslint-disable no-restricted-globals */
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


function render(display = '0', before = 0, background = '') {
  console.log(display, before, background);
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{display}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => {
          if (display === '0') {
            return <button type="button" onClick={() => { render(`${i}`, i, `${i}`); }}>{i}</button>;
          } if (isNaN(before)) {
            return <button type="button" onClick={() => { render(`${i}`, i, `${background}${i}`); }}>{i}</button>;
          }
          return <button type="button" onClick={() => { render(`${display}${i}`, i, `${background}${i}`); }}>{i}</button>;
        })}
      </p>
      <p>
        {['+', '-'].map((i) => {
          if (display === '0') {
            return <button type="button" onClick={() => { render(`${i}`, i, `${i}`); }}>{i}</button>;
          } if (isNaN(before)) {
            return <button type="button" onClick={() => { render(`${display}`, i, `${background.slice(0, background.length - 1)}${i}`); }}>{i}</button>;
          }
          return <button type="button" onClick={() => { render(eval(`${background}`), i, `${background}${i}`); }}>{i}</button>;
        })}
        {['*', '/'].map((i) => {
          if (display === '0') {
            return <button type="button" onClick={() => { render(`${display}`, i, `${display}${i}`); }}>{i}</button>;
          } if (isNaN(before)) {
            return <button type="button" onClick={() => { render(`${display}`, i, `${background.slice(0, background.length - 1)}${i}`); }}>{i}</button>;
          }
          return <button type="button" onClick={() => { render(eval(`${background}`), i, `${eval(`${background}`)}${i}`); }}>{i}</button>;
        })}
        <button
          type="button"
          onClick={() => {
            if (display !== 0) {
              render(eval(`${background}`), '=', `${eval(`${background}`)}`);
            }
          }}
        >
          =
        </button>

      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
