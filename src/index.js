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

function handleCalculator(orgnValue, windowNumber, numOrOperator) {
  // https://stackoverflow.com/questions/20169217/how-to-write-isnumber-in-javascript
  // _isNumber

  // console.log('orgnValue: ', orgnValue, ', windowNumber: ', windowNumber , ', numOrOperator: ', numOrOperator);
  
  if (numbers.includes(numOrOperator)) {
    if (windowNumber == 0 || orgnValue[orgnValue.length-1] == '=') {
      // 0 이라면 지워주자
      render(numOrOperator.toString(), numOrOperator);
    } else {
      // 만약에 바로 앞선 문자열이 operator 라면
      const isLastCharOperator = operators.includes(orgnValue[orgnValue.length-1]);
      if (isLastCharOperator) {
        render(orgnValue.toString() + numOrOperator, numOrOperator)
      } else {
        render(orgnValue.toString() + numOrOperator, parseInt(windowNumber.toString() + numOrOperator));
      }
      
    }
  }

  if (operators.includes(numOrOperator)) {
    // 만약 orgnValue에 operator가 포함되어있고 지금도 numOrOperator가 operator 라면 
    // orgnValue를 초기화 시키고, windowNumber를 Update
    const isOrgnValueIncludeOperator = operators.some(el => orgnValue.includes(el));
    
    if (isOrgnValueIncludeOperator) {
      // 계산
      operators.forEach(el => {
        if (orgnValue.includes(el)) {
          const indexOfOperator = orgnValue.indexOf(el);
          const curOperator = orgnValue[indexOfOperator];
          const [firstNumber, SecondNumber] = orgnValue.split(orgnValue[indexOfOperator]);
          if (curOperator == '+') {
            const resValue = parseInt(firstNumber) + parseInt(SecondNumber);
            render(resValue.toString() + numOrOperator, resValue);
          }
          if (curOperator == '-') {
            const resValue = parseInt(firstNumber) - parseInt(SecondNumber);
            render(resValue.toString() + numOrOperator, resValue);
          }
          if (curOperator == '*') {
            const resValue = parseInt(firstNumber) * parseInt(SecondNumber);
            render(resValue.toString() + numOrOperator, resValue);
          }
          if (curOperator == '/') {
            const resValue = parseInt(firstNumber) / parseInt(SecondNumber);
            render(resValue.toString() + numOrOperator, resValue);
          }
          if (curOperator == '=') {
            render('=', windowNumber);
          }
        }
        
      })
    } else {
      if (numOrOperator == '=') {
        render(orgnValue.toString(), windowNumber);
      } else {
        render(orgnValue.toString() + numOrOperator, windowNumber);
      }
      
    }
    
  }
}

// orgnValue = 사칙연산이 들어간 문자열
function render(orgnValue = '', windowNumber = 0) {
  // console.log(orgnValue, windowNumber);
  const element = (
    <div id="calculator">
      <p>간단 계산기</p>
      <p>
        {windowNumber}
      </p>
      <p>
        {numbers.map(i => (
          <button onClick={() => handleCalculator(orgnValue, windowNumber, i)}>{i}</button>
        ))}
      </p>
      <p>
        {operators.map(i => (
          <button onClick={() => handleCalculator(orgnValue, windowNumber, i)}>{i}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
