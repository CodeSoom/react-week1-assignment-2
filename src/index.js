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

function render({ display }) {
  const $title = (
    <div>
      <p>간단 계산기</p>
    </div>
  );

  const $display = (
    <h3 id="display">{display}</h3>
  );

  function handleClickNumber(clickedNumber) {
    // * 숫자를 누르면 누른 숫자가 출력되어야 한다.
    // * 숫자를 연속해서 누르면 숫자가 더해져서 출력되어야 한다.

    // ! 시작 화면(0)인 상태에서 숫자를 클릭했을 경우 : 숫자 그대로 출력한다.
    if (display === '0') {
      return render({ display: clickedNumber });
    }

    return render(
      {
        display: display + clickedNumber,
      },
    );
  }

  function handleClickOperator() {
    //
  }

  const $calculator = (
    <div>
      <p>
        {
          ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((number) => (
            <button type="button" onClick={() => handleClickNumber(number)}>
              {number}
            </button>
          ))
        }
      </p>
      <p>
        {
          ['+', '-', '*', '/', '='].map((operator) => (
            <button type="button" onClick={handleClickOperator}>
              {operator}
            </button>
          ))
        }
      </p>
    </div>
  );

  const $app = document.getElementById('app');
  $app.textContent = '';
  $app.appendChild($title);
  $app.appendChild($display);
  $app.appendChild($calculator);
}

render({ display: '0' });
