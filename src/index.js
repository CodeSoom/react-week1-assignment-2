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
const operators = ['+', '-', '*', '/', '='];

function onClickNumber(originValue, windowNumber, number) {
  console.log({originValue, windowNumber, number});
  
  if (originValue.slice(-1) == '=') {
    render(number.toString(), number);
    return;
  } else {
    // 만약에 바로 앞선 문자열이 operator 라면
    const isLastCharOperator = operators.includes(originValue.slice(-1));
    if (isLastCharOperator) {
      render(originValue.toString() + number, number)
      return;
    } else {
      render(originValue.toString() + number, Number(windowNumber.toString() + number));
      return;
    }
  }
}

function onClickOperator(originValue, windowNumber, operator) {
  console.log({originValue, windowNumber, operator});

  function _renderByOperator(originValue, operatorInOriginValue, pressedOperator) {
    const operator = originValue[originValue.indexOf(operatorInOriginValue)];
    const [firstNumber, secondNumber] = originValue.split(originValue[originValue.indexOf(operatorInOriginValue)]);
    if (operator == '+') {
      const resValue = Number(firstNumber) + Number(secondNumber);
      render(resValue.toString() + pressedOperator, resValue);
      return;
    }
    if (operator == '-') {
      const resValue = Number(firstNumber) - Number(secondNumber);
      render(resValue.toString() + pressedOperator, resValue);
      return;
    }
    if (operator == '*') {
      const resValue = Number(firstNumber) * Number(secondNumber);
      render(resValue.toString() + pressedOperator, resValue);
      return;
    }
    if (operator == '/') {
      const resValue = Number(firstNumber) / Number(secondNumber);
      render(resValue.toString() + pressedOperator, resValue);
      return;
    }
  }

  if (operators.some(el => originValue.includes(el))) {
    // 계산 STAGE
    operators.forEach(operatorInOriginValue => {
      if (originValue.includes(operatorInOriginValue)) {
        _renderByOperator(originValue, operatorInOriginValue, operator);
        if (operatorInOriginValue == '=') {
          render('=', windowNumber);
          return;
        }
      }
    })
  } else {
    if (operator == '=') {
      render(originValue.toString(), windowNumber);
      return;
    } else {
      render(originValue.toString() + operator, windowNumber);
      return;
    }
  } 
}

function render(originValue = '', windowNumber = 0) {
  console.log(originValue, windowNumber);
  const element = (
    <div id="calculator">
      <p>간단 계산기</p>
      <p>
        {windowNumber}
      </p>
      <p>
        {numbers.map(number => (
          <button onClick={() => onClickNumber(originValue, windowNumber, number)}>{number}</button>
        ))}
      </p>
      <p>
        {operators.map(operator => (
          <button onClick={() => onClickOperator(originValue, windowNumber, operator)}>{operator}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
