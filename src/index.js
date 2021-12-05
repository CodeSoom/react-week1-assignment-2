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

// TODO calculation 변수 리팩터링
// TODO 2개 이상 연속한 숫자의 연산
let calculation;

function render(count = 0) {
  const handleClickNumber = (value) => {
    render(value);
  };

  const handleClickValue = (event) => {
    calculation = event.target.value;
  };

  const handleClickSum = () => {
    if (calculation === 'plus') {
      render(count + count);
    }
    if (calculation === 'minus') {
      render(count - count);
    }
    if (calculation === 'multiplication') {
      render(count * count);
    }
    if (calculation === 'division') {
      render(count / count);
    }
  };

  const element = (
    <div>
      <p>간단 계산기</p>
       <p>{count}</p>
      <div>
        <button type="button" value="plus" onClick={(event) => handleClickValue(event)}>+</button>
        <button type="button" value="minus" onClick={(event) => handleClickValue(event)}>-</button>
        <button type="button" value="multiplication" onClick={(event) => handleClickValue(event)}>*</button>
        <button type="button" value="division" onClick={(event) => handleClickValue(event)}>/</button>
        <button type="button" onClick={() => handleClickSum()}>=</button>
      </div>
      <p>
        {[1, 2, 3].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
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

