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
  // console.log(oper);
  if (oper === "+") return a + b;
  if (oper === "-") return a - b;
  if (oper === "*") return a * b;
  if (oper === "/") return Math.round((a / b) * 10) / 10;
  return 0;
}

function render(currentNum, numberArr, operatorArr) {
  const numberList = numberArr;
  const operatorList = operatorArr;
  const number = currentNum;
  var operUsed = false;

  const numberBtnList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operatorBtnList = ["+", "-", "*", "/", "="];

  const numberClick = (ClickedNumber) => {
    if (operUsed === false) {
      const newNumber = number * 10 + ClickedNumber;
      render(newNumber, numberList, operatorList);
    } else {
      render(ClickedNumber, numberList, operatorList);
    }
  };

  const operatorClick = (operator) => {
    operUsed = true;
    numberList.push(number);
    if (operator === "=") {
      const result = calculate(numberList, operatorList);
      render(result, numberList, operatorList);
    } else {
      operatorList.push(operator);
      // console.log(operatorList);
      if (operatorList.length > 1) {
        const result = calculate(numberList, operatorList.slice(0, -1));
        numberList.push(result);
        render(result, numberList, operatorList.slice(1));
      }
    }
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number}</p>
      <div className="numbers">
        {numberBtnList.map((i) => (
          <button type="button" onClick={() => numberClick(i)}>
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

  document.getElementById("app").textContent = "";
  document.getElementById("app").appendChild(element);
}

render(0, [], []);
