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

function render({ renderValue, memoValue }) {
  const appElement = document.getElementById('app');

  /** 숫자 */
  const handleClickNumber = (value) => {
    const sumValue = renderValue + String(value);

    if (renderValue[0] === '0') {
      return render({ renderValue: Number(sumValue.slice(1)) });
    }

    return render({ renderValue: Number(sumValue) });
    // return render({ renderValue: Number(sumValue), memoValue: ??? });
  };

  /** 연산자 */
  const handleClickOperator = (value) => render({ memoValue: 0 + value });

  const element = (
    <div>
      <p>간단 계산기</p>
      <span>{renderValue}</span>
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
        <button type="button" onClick={() => handleClickOperator(renderValue)}>
          {item}
        </button>
      ))}
    </div>
  );

  appElement.textContent = '';
  appElement.appendChild(element);
}

render({ renderValue: 0, memoValue: 0 });
