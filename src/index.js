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

function render({ result = [0] }) {
  function isNumberLast() {
    return Number.isInteger(result.slice(-1)[0]);
  }
  function isCalculateDone() {
    return result.slice(-1)[0] === '=';
  }
  function getDisplayNumber() {
    const newResult = [...result].reverse();
    if (!Number.isInteger(newResult[0])) {
      return newResult[1];
    }
    return newResult[0];
  }
  function mergeNumber({ newResult, number }) {
    if (isNumberLast()) {
      return newResult.map((num, index) => {
        if (index === newResult.length - 1) {
          return newResult.slice(-1)[0] * 10 + number;
        }
        return num;
      });
    }
    return newResult;
  }

  function onNumberClick({ number }) {
    if (isCalculateDone()) {
      render({ result: [number] });
      return;
    }

    const newResult = mergeNumber({ newResult: result, number });
    if (isNumberLast()) {
      render({ result: newResult });
      return;
    }
    render({ result: [...newResult, number] });
  }

  function onCalculate({ sign }) {
    const calculator = {
      '+': [result[0] + result[2], sign],
      '-': [result[0] - result[2], sign],
      '*': [result[0] * result[2], sign],
      '/': [result[0] / result[2], sign],
    };
    return calculator[result[1]];
  }

  function onSignClick({ sign }) {
    if (!isNumberLast()) {
      const newResult = result.map((num, index) => {
        if (index === result.length - 1) {
          return sign;
        }
        return num;
      });
      render({ result: newResult });
      return;
    }

    if (result.length >= 3) {
      const newReuslt = onCalculate({ sign });
      render({ result: newReuslt });
      return;
    }

    render({ result: [...result, sign] });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{getDisplayNumber()}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button
            type="button"
            onClick={() => onNumberClick({ number: i })}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((sign) => (
          <button
            type="button"
            onClick={() => onSignClick({ sign })}
          >
            {sign}
          </button>
        ))}
      </p>
    </div>
  );

  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(element);
}

render({});
