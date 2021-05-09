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

let savedSign = '';
const numberList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const signList = ['+', '-', '*', '/', '='];

function render(leftNumber, rightNumber, paraSign) {
  console.log(leftNumber, rightNumber, paraSign, savedSign);
  const results = {
    '+': Number(leftNumber) + Number(rightNumber),
    '-': Number(leftNumber - rightNumber),
    '*': Number(leftNumber * rightNumber),
    '/': Number(leftNumber / rightNumber),
    '=': Number(leftNumber),
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="result">
        {
          savedSign === ''
            ? leftNumber
            : rightNumber
        }
      </p>
      <p>
        {
          (function a() {
            if (paraSign !== '') savedSign = paraSign;
            return '';
          }())
        }
        {
          savedSign === ''
            ? numberList.map((clickedNumber) => (
              <button type="button" onClick={() => render(leftNumber + clickedNumber, rightNumber, '')}>
                {clickedNumber}
              </button>
            ))
            : numberList.map((clickedNumber) => (
              <button type="button" onClick={() => render(leftNumber, rightNumber + clickedNumber, '')}>
                {clickedNumber}
              </button>
            ))
        }
      </p>
      <p>
        {signList.map((clickedSign) => (
          <button type="button" onClick={() => render(leftNumber, rightNumber, clickedSign)}>
            {clickedSign}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render('', '', '');

// function mathNums(savedLeftNumber, savedRightNumber, clickedSign) {
//   let leftnum = Number(savedLeftNumber);
//   const rightnum = Number(savedRightNumber);

//   leftnum += rightnum;
// }

// function numberClick(clickedNumber) {
//   console.log(clickedNumber);
//   if (savedSign === '') {
//     numberLeft += clickedNumber;
//     document.getElementById('result').innerText = numberLeft;
//     return;
//   }
//   numberRight += clickedNumber;
//   document.getElementById('result').innerText = numberRight;
// }

// function strClick(clickedSign) {
//   if (savedSign === '') {
//     savedSign = clickedSign;
//     return;
//   }
//   numberLeft = Number(numberLeft);
//   numberRight = Number(numberRight);
//   if (savedSign === '+') {
//     numberLeft += numberRight;
//   } else if (savedSign === '-') {
//     numberLeft -= numberRight;
//   } else if (savedSign === '*') {
//     numberLeft *= numberRight;
//   } else if (savedSign === '/') {
//     numberLeft /= numberRight;
//   }
//   document.getElementById('result').innerText = numberLeft;
//   numberRight = '';
//   savedSign = clickedSign;
//   if (clickedSign === '=') {
//     numberLeft = '';
//     savedSign = '';
//   }
// }
