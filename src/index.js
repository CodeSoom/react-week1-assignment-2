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

function render(displayNumber = 0, currentNumber = 0, calculateContent = []) {
  console.log(displayNumber, currentNumber, calculateContent);

  const calculateNumbers = () => {
    const [x, operator, y] = calculateContent;
    const result = {
      '+': x + y,
      '-': x - y,
      '*': x * y,
      '/': x / y,
    };
    return result[operator];
  };

  const clickNumberBtn = (i) => {
    if (!currentNumber) {
      render(i, i, calculateContent);
    } else {
      const combineNumber = Number(currentNumber + i.toString());
      render(combineNumber, combineNumber, calculateContent);
    }
  };

  const clickOperatorBtn = (i) => {
    calculateContent.push(numbers.pop());
    if (calculateContent.length === 1) {
      calculateContent.push(i);
      render(calculateContent[0], numbers, calculateContent);
    } else {
      render(calculateNumbers(), numbers, [calculateNumbers(), i]);
    }
  };

  const clickResultBtn = () => {
    calculateContent.push(numbers.pop());
    render(calculateNumbers());
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number}</p>
      <div>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
            <button
              type="button"
              onClick={() => clickNumberBtn(i)}
            >
              {i}
            </button>
          ))
        }
      </div>
      <div>
        {['+', '-', '*', '/'].map((i) => (
          <button
            type="button"
            onClick={() => clickOperatorBtn(i)}
          >
            {i}
          </button>
        ))}
        <button
          type="button"
          onClick={clickResultBtn}
        >
          =
        </button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
