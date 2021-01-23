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

function isEmpty(list) {
  return !list.length;
}

function calculate(numList, operList) {
  const b = numList.pop();
  const a = numList.pop();
  const oper = operList.shift();
  if (oper === '+') return a + b;
  if (oper === '-') return a - b;
  if (oper === '*') return a * b;
  if (oper === '/') return Math.round((a / b) * 100) / 100;
  return 0;
}

function render(
  number = 0,
  numberList = [],
  operatorList = [],
  operUsed = false,
) {
  const numberBtnList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operatorBtnList = ['+', '-', '*', '/', '='];

  const numberClick = (ClickedNumber, isOperUsed) => {
    if (isOperUsed === false) {
      const newNumber = number * 10 + ClickedNumber;
      render(newNumber, numberList, operatorList, false);
    } else {
      render(ClickedNumber, numberList, operatorList, false);
    }
  };

  const operatorClick = (operator) => {
    numberList.push(number);
    if (operator === '=') {
      const result = calculate(numberList, operatorList);

      render(result, numberList, operatorList, false);
    } else {
      operatorList.push(operator);
      if (operatorList.length > 1) {
        const result = calculate(numberList, operatorList);
        numberList.push(result);
        render(result, numberList, operatorList, true);
      } else {
        const result = number;
        render(result, numberList, operatorList, true);
      }
    }
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number}</p>
      <div className="numbers">
        {numberBtnList.map((i) => (
          <button type="button" onClick={() => numberClick(i, operUsed)}>
            {i}
          </button>
        ))}
      </div>
      <div className="operators">
        {operatorBtnList.map((i) => (
          <button type="button" onClick={() => operatorClick(i)}>
            {i}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
