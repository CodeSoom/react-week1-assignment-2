/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* eslint linebreak-style: ["error", "windows"] */
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

let store;

function render(result = '') {
  function onClickReturnResultButton(clickText) {
    const formatResult = Number(result);
    const formatClickText = Number(clickText);

    if (isNaN(formatClickText)) {
      store = clickText;
      return render(result);
    }

    if (store === '+') {
      store = null;
      return render(formatResult + formatClickText);
    }

    if (store === '-') {
      store = null;
      return render(formatResult - formatClickText);
    }

    if (store === '*') {
      store = null;
      return render(formatResult * formatClickText);
    }

    if (store === '/') {
      store = null;
      return render(formatResult / formatClickText);
    }

    return render(result + clickText);
  }


  const element = (
    <div>
      <p>간단계산기</p>
      <p>
        정답 :
        {result}
      </p>
      <p>
        {
          ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '='].map((text) => (
            <button type="button" onClick={() => onClickReturnResultButton(text)}>{text}</button>
          ))
        }
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
