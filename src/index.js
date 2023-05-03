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

let clickedFirstNum = null;
let clickedSecondNum = null;
let clickedOperator = null;

const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const calculations = ['+', '-', '*', '/', '='];

function numberHandler(num) {
  if (!clickedOperator) {
    !clickedFirstNum
      ? (clickedFirstNum = num)
      : (clickedFirstNum = clickedFirstNum * 10 + num);
  } else {
    !clickedSecondNum
      ? (clickedSecondNum = num)
      : (clickedSecondNum = clickedSecondNum * 10 + num);
  }

  render();
}

function calculationCases(operator) {
  switch (operator) {
    case '+':
      clickedFirstNum += clickedSecondNum;
      break;
    case '-':
      clickedFirstNum -= clickedSecondNum;
      break;
    case '*':
      clickedFirstNum *= clickedSecondNum;
      break;
    case '/':
      clickedFirstNum /= clickedSecondNum;
      break;
    default:
      break;
  }
  clickedSecondNum = null;
  render();
}

function operatorHandler(calculation) {
  if (clickedOperator) {
    calculationCases(clickedOperator);
  }
  clickedOperator = calculation;
}

function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <div>
        {!clickedSecondNum ? clickedFirstNum || 0 : clickedSecondNum || 0}
      </div>
      <div>
        {numberList.map((num) => (
          <button onClick={() => numberHandler(num)}>{num}</button>
        ))}
      </div>
      <div>
        {calculations.map((calculation) => (
          <button onClick={() => operatorHandler(calculation)}>
            {calculation}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
