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

const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const calculations = ['+', '-', '*', '/', '='];

function render(
  clickedFirstNum = null,
  clickedSecondNum = null,
  clickedOperator = null
) {
  function handlerClickNumber(num) {
    if (clickedOperator === null) {
      if (clickedFirstNum === null) {
        render((clickedFirstNum = num), clickedSecondNum, clickedOperator);
      } else {
        render(
          (clickedFirstNum = clickedFirstNum * 10 + num),
          clickedSecondNum,
          clickedOperator
        );
      }
    } else {
      if (clickedSecondNum === null) {
        render(clickedFirstNum, (clickedSecondNum = num), clickedOperator);
      } else {
        render(
          clickedFirstNum,
          (clickedSecondNum = clickedSecondNum * 10 + num),
          clickedOperator
        );
      }
    }
  }

  function handlerClickOperator(calculation) {
    function calculationCases(clickedOperator) {
      switch (clickedOperator) {
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
    }
    if (clickedOperator) {
      calculationCases(clickedOperator);
    }
    clickedOperator = calculation;
    render(clickedFirstNum, clickedSecondNum, clickedOperator);
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <div>
        {clickedSecondNum === null
          ? clickedFirstNum || 0
          : clickedSecondNum || 0}
      </div>
      <div>
        {numberList.map((num) => (
          <button onClick={() => handlerClickNumber(num)}>{num}</button>
        ))}
      </div>
      <div>
        {calculations.map((calculation) => (
          <button onClick={() => handlerClickOperator(calculation)}>
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
