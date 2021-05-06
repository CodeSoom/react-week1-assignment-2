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

function render(viewNumber, operator, inputNumber, resultNumber) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        보이는값:
        { viewNumber }
      </p>
      <p>
        연산자 버튼 눌렀을 때:
        { operator }
      </p>
      <p>
        숫자버튼 누를때 입력되는 값:
        { inputNumber }
      </p>
      <p>
        임시값:
        { resultNumber }
      </p>
      <p>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
            <button
              type="button"
              className="num"
              value={i}
              onClick={() => render(i, operator, i, resultNumber)}
            >
              {i}
            </button>
          ))
        }
      </p>
      <p>
        <button
          type="button"
          className="operator"
          onClick={() => render(viewNumber, '+', inputNumber, resultNumber)}
        >
          +
        </button>
        <button
          type="button"
          className="operator"
          onClick={() => render(viewNumber, '-', inputNumber, resultNumber)}
        >
          -
        </button>
        <button
          type="button"
          className="operator"
          onClick={() => render(viewNumber, '*', inputNumber, resultNumber)}
        >
          *
        </button>
        <button
          type="button"
          className="operator"
          onClick={() => render(viewNumber, '/', inputNumber, resultNumber)}
        >
          /
        </button>
        <button
          type="button"
          className="equals"
          onClick={() => render(viewNumber, '=', inputNumber, resultNumber)}
        >
          =
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0, '', 0, 0);
