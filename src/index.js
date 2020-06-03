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
function makeButton(i, display, before, caseDisplayIsZero, caseBeforeIsNaN, caseRemainder) {
  if (display === '0') {
    return <button type="button" onClick={caseDisplayIsZero}>{i}</button>;
  }
  if (isNaN(before)) {
    return <button type="button" onClick={caseBeforeIsNaN}>{i}</button>;
  }
  return <button type="button" onClick={caseRemainder}>{i}</button>;
}

function render(display = '0', before = 0, background = '') {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{display}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => {
          const caseDisplayIsZero = () => { render(`${i}`, i, `${i}`); };
          const caseBeforeIsNaN = () => { render(`${i}`, i, `${background}${i}`); };
          const caseRemainder = () => { render(`${display}${i}`, i, `${background}${i}`); };

          return makeButton(i, display, before, caseDisplayIsZero, caseBeforeIsNaN, caseRemainder);
        })}
      </p>
      <p>
        {['+', '-'].map((i) => {
          const caseDisplayIsZero = () => { render(`${i}`, i, `${i}`); };
          const caseBeforeIsNaN = () => { render(`${display}`, i, `${background.slice(0, background.length - 1)}${i}`); };
          const caseRemainder = () => { render(eval(`${background}`), i, `${background}${i}`); };

          return makeButton(i, display, before, caseDisplayIsZero, caseBeforeIsNaN, caseRemainder);
        })}
        {['*', '/'].map((i) => {
          const caseDisplayIsZero = () => { render(`${display}`, i, `${display}${i}`); };
          const caseBeforeIsNaN = () => { render(`${display}`, i, `${background.slice(0, background.length - 1)}${i}`); };
          const caseRemainder = () => { render(eval(`${background}`), i, `${eval(`${background}`)}${i}`); };

          return makeButton(i, display, before, caseDisplayIsZero, caseBeforeIsNaN, caseRemainder);
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
