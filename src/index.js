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

function render({ result }) {
  const appElement = document.getElementById('app');

  const handleClickNumber = (value) => {
    const sumValue = result + String(value);

    if (result[0] === '0') {
      return render({ result: sumValue.slice(1) });
    }

    return render({ result: sumValue });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <span>{result}</span>
      <br />
      <br />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item) => (
        <button type="button" onClick={() => handleClickNumber(item)}>
          {item}
        </button>
      ))}
      <br />
      <br />
      {['+', '-', '*', '/', '='].map((item) => (
        <button type="button">{item}</button>
      ))}
    </div>
  );

  appElement.textContent = '';
  appElement.appendChild(element);
}

render({ result: '0' });
