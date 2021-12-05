/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */
const app = document.getElementById('app');

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

function render({ tempNumber, numberStack, accStack }) {
  console.log(tempNumber)
  console.log("숫자 배열", numberStack);
  console.log("연산자 배열", accStack)

  function handleClickNumber(e) {
    render({
      tempNumber: tempNumber * 10 + parseInt(e.target.innerText, 10),
      numberStack: numberStack,
      accStack: accStack
    })
  }

  function handleClickAcc(e) {
    render({
      tempNumber: 0,
      numberStack: [...numberStack, tempNumber],
      accStack: [...accStack, e.target.innerText]
    })
  }

  function buttonMaker(arr, event) {
    return (
      <p>
        {arr.map((value) => (
          <button type="button" onClick={event}>
            {value}
          </button>
        ))}
      </p>
    );
  }

  const element = (
    <div>
      <div>
        {0}
      </div>
      <div>
        {buttonMaker([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], handleClickNumber)}
        {buttonMaker(['+', '-', '*', '/', '='], handleClickAcc)}
      </div>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render({
  tempNumber: 0,
  numberStack: [],
  accStack: []
});
