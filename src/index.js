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

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const initState = {
  number: 0,
};

function render(state) {
  const { totalValue, number, operator } = state;
  console.log(number);

  function onClickNumber(value) {
    render({
      ...state,
      number: number * 10 + value,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number}</p>
      <p>
        {numbers.map((numberPrint) => (
          <button type="button" onClick={() => onClickNumber(numberPrint)}>
            {numberPrint}
          </button>
        ))}
      </p>
      <p>
        {["+", "-", "*", "/", "="].map((operatorValue) => (
          <button type="button">{operatorValue}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById("app").textContent = "";
  document.getElementById("app").appendChild(element);
}

render(initState);
