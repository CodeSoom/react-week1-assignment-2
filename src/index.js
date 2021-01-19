/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

//Fixing CRLF ISSUES

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

function handleDigit(presentNumber, previousNumber = "0") {
  if (presentNumber === "0") {
    return true;
  }
  if (presentNumber === previousNumber) {
    return true;
  }
  return false;
}

function handleJoin(presentNumber, digit) {
  return [...presentNumber, ...digit].reduce((prev, cur) => prev + cur);
}

function render(presentNumber = "0", previousNumber = "0", presentSign = 0) {
  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const signs = ["+", "-", "*", "/", "="];

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{presentNumber}</p>
      <p>
        {digits.map((digit) => (
          <button
            type="button"
            onClick={() => {
              if (previousNumber === "0") {
                if (handleDigit(presentNumber)) {
                  render(digit, previousNumber, presentSign);
                } else {
                  render(
                    handleJoin(presentNumber, digit),
                    previousNumber,
                    presentSign
                  );
                }
              } else {
                if (handleDigit(presentNumber, previousNumber)) {
                  render(digit, previousNumber, presentSign);
                } else {
                  render(
                    handleJoin(presentNumber, digit),
                    previousNumber,
                    presentSign
                  );
                }
              }
            }}
          >
            {digit}
          </button>
        ))}
      </p>
      <p>
        {signs.map((sign) => (
          <button
            type="button"
            onClick={() => {
              render(presentNumber, presentNumber, sign);
            }}
          >
            {sign}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById("app").textContent = "";
  document.getElementById("app").appendChild(element);
}

render();
