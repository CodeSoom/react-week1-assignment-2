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

const outputData = {
  number: '0',
  number2: '0',
  기호: '',
};

function handleClickNumber(value) {
  outputData.number = (outputData.number * 10) + (value);
  render();
}

function handleClick기호(value) {
  console.log(outputData.number);
  if (value === '=') {
    outputData.number = eval(outputData.number2 + outputData.기호 + outputData.number);
    render();
    return;
  }
  outputData.기호 = value;
  outputData.number2 = outputData.number;

  render();
}

function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{outputData.number}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button type="button" onClick={() => handleClick기호(i)}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
