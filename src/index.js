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

function handleNumberClick(value) {
  if ("0" === "0") {
    render(value)
  } else {
    console.log(value);
  }
}

function handleOperatorClick(value, operator) {
  console.log(value);
  switch (value) {
    case "=":

      break;
    case "+":
      operator = "+";
      break;
    case "-":
      operator = "-";
      break;
    case "*":
      operator = "*";
      break;
    case "/":
      operator = "/";
      break;
  }
}

function buttonMaker(arr) {
  return (
    <p>
      {arr.map((value) => {
        return (
          <button type="button" onClick={() => handleNumberClick(value)}>
            {value}
          </button>
        )
      })}
    </p>
  )
}

const buttons = (
  <div>
    {buttonMaker([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])}
    {buttonMaker(["+", "-", "*", "/", "=", "c"])}
  </div>
)

function render(operand) {
  document.getElementById('line').appendChild(document.createTextNode(operand));
}

document.getElementById('buttons').appendChild(buttons);
render("0");
