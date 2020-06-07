/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension */
/* eslint-disable no-new-func, no-use-before-define, no-unused-vars */
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

const calculate = (expression) => new Function(`return String(${expression})`)();

const handleClickedNumber = (data, number) => {
  const { operandA, operandB, expression } = data;
  const showNumber = operandA * 10 + number;
  const expressions = expression.concat(showNumber);
  console.log(`operandA:: ${operandA} showNumber:: ${showNumber} expressions:: ${expressions}`);
  render({
    operandA: showNumber,
    operandB,
    expression: expressions,
  });
  // if ((operatedNumber >= 2) || operandA === '0'){
  // render(userNumber, operandB, operator, operatedNumber, afterResult);}
  // else if (operator !== '') {
  //   if (afterResult) render(userNumber, false)
  //   render(userNumber, operandA, operator, operatedNumber, afterResult);
  // }else render(operandA.concat(userNumber), operandB, operator, operatedNumber, afterResult);
};

const handleClickedOpertor = (data, operator) => {
  const { operandA, operandB, expression } = data;
  const numbers = expression.filter((value) => !operatorList.includes(value));
  const expressions = expression.concat(operator);
  console.log(`operandA:: ${operandA} operandB:: ${operandB} numbers:: ${numbers}`);
  console.log(`expressions:: ${expressions}`);
  if (numbers < 2) render({ operandA, operandB, expressions });
  else {
    render({
      opreandA: calculate(expressions),
      operandB: operandA,
      expression: operator === '=' ? '' : expressions,
    });
  }
  // if (operandB === '-1') {
  //   render(operandA, operandB, userOperator, operatedNumber + 1, afterResult);
  // } else if (userOperator === '=') {
  //   render(calculate(result), '-1', '', 0, true);
  // } else {
  //   render(
  //     operandA,
  //     calculate(result),
  //     userOperator,
  //     operatedNumber + 1,
  //     afterResult,
  //   );
  // }
};

const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operatorList = ['+', '-', '*', '/', '='];

function render(data = { operandA: 0, operandB: 0, expression: '' }) {
  const { operandA } = data;

  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="result">{operandA}</p>
      <p id="btn-Number">
        {numberList.map(
          (number) => (
            <button
              type="button"
              onClick={() => {
                handleClickedNumber(data, number);
              }}
            >
              {number}
            </button>
          ),
        )}
      </p>
      <p id="btn-operator">
        {operatorList.map((operator) => (
          <button
            type="button"
            onClick={() => handleClickedOpertor(data, operator)}
          >
            {operator}
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
