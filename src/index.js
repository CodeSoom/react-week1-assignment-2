/* eslint-disable no-new-func */
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
function render(operandA = '0', operandB = '-1', operator = '', operatedNumber = 0, afterResult = false) {
  console.log(
    `operandA::${operandA} operandB::${operandB} typeOperandB::${typeof (operandB)} operator:: ${operator} operatedNumber:: ${operatedNumber} resultNumber: ${resultNumber}`,
  );

  const handleClickedNumber = (userNumber) => {
    // if ((operatedNumber >= 2) || operandA === '0') render(userNumber, operandB, operator, operatedNumber, afterResult);
    // else if (operator !== '') {
    //   if (afterResult) render(userNumber, false)
    //   render(userNumber, operandA, operator, operatedNumber, afterResult);
    // }else render(operandA.concat(userNumber), operandB, operator, operatedNumber, afterResult);
  };

  const calculate = (expression) => new Function(`return String(${expression})`)();

  const handleClickedOpertor = (userOperator) => {
    const result = String(operandB.concat(operator, operandA));
    if (operandB === '-1') {
      render(operandA, operandB, userOperator, operatedNumber + 1, afterResult);
    } else if (userOperator === '=') {
      render(calculate(result), '-1', '', 0, true);
    } else {
      render(
        operandA,
        calculate(result),
        userOperator,
        operatedNumber + 1,
        afterResult,
      );
    }
  };
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{operandA}</p>
      <p>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map(
          (numberPlate) => (
            <button
              type="button"
              onClick={() => {
                handleClickedNumber(numberPlate);
              }}
            >
              {numberPlate}
            </button>
          ),
        )}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((operatorPanel) => (
          <button
            type="button"
            onClick={() => handleClickedOpertor(operatorPanel)}
          >
            {operatorPanel}
          </button>
        ))}
      </p>
    </div>
  );
  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}
render();
// let flagOperation = false;
// let flagEqual = false;
// let operatorNum = 0;
// let operator = '';
// let value = '0';
// let result = 0;

// const calculate = (a, op, b) => {
//   if (op === '+') {
//     // console.log(`a::${a} b::${b}`);
//     // console.log(Number(a) + Number(b));
//     return Number(a) + Number(b);
//   }
//   if (op === '-') {
//     return Number(a) - Number(b);
//   }
//   if (op === '*') {
//     return Number(a) * Number(b);
//   }
//   if (op === '/') {
//     return Number(a) / Number(b);
//   }
//   return false;
// };

// function buttonclick(i) {
//   if (flagEqual) {
//     value = i;
//     flagOperation = false;
//     flagEqual = false;
//     render();
//     return;
//   }
//   if (flagOperation) {
//     result = result + operator + i;
//     console.log(result);
//     if (operatorNum > 1) value = result;
//     else value = i;
//     flagOperation = false;
//   }
//   else if (value === '0') value = i;
//   else value += i;
//   render();
// }

// function checkOperator(nowOperator) {
//   operator = nowOperator;
//   operatorNum += 1;
//   flagOperation = true;
//   if (nowOperator === '=') {
//     value = result;
//     operatorNum = 0;
//     result = 0;
//     flagEqual = true;
//   }
//   render();
// }

// function render() {
//   const element = (
//     <div>
//       <p>간단 계산기</p>
//       <p>
//         {value}
//       </p>
//       <p>
//         {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((i) => (
//           <button type="button" onClick={() => buttonclick(i)}>
//             {i}
//           </button>
//         ))}
//       </p>
//       <p>
//         {' '}
//         {['+', '-', '*', '/', '='].map((nowOperator) => (
//           <button
//             type="button"
//             onClick={() => checkOperator(nowOperator)}
//           >
//             {nowOperator}
//           </button>
//         ))}
//       </p>
//     </div>
//   );

//   document.getElementById('app').textContent = '';
//   document.getElementById('app').appendChild(element);
// }

// render();
