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

function render(number = 0, numbers = [], calculateContent = []) {
  const combineNumber = (num) => {
    if (!numbers[0]) {
      numbers.push(num);
    } else {
      numbers[0] += num.toString();
      numbers[0] = Number(numbers[0]);
    }
  };

  const calculateNumbers = () => {
    switch (calculateContent[1]) {
      case '+':
        return calculateContent[0] + calculateContent[2];
      case '-':
        return calculateContent[0] - calculateContent[2];
      case '*':
        return calculateContent[0] * calculateContent[2];
      case '/':
        return calculateContent[0] / calculateContent[2];
      default:
        return 0;
    }
  };

  const clickNumberBtn = (i) => {
    combineNumber(i);
    render(numbers[0], numbers, calculateContent);
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
