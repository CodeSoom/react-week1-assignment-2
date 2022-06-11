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

let flag = true;
const calculationExpressions = {
  '+': (num1, num2) => +num1 + +num2,
  '-': (num1, num2) => num1 - num2,
  '*': (num1, num2) => num1 * num2,
  '/': (num1, num2) => num1 / num2,
  '=': (num1, num2) => num1,

};
const expression = [];

function calculLog(value) {
  const calculLogValue = value;
}

function buttonClicked(value) {
  if (flag) {
    console.log(value);
    calculLog(value);
    render(value);
  } else {
    flag = true;
    console.log(expression);
    render(value[value.length - 1]);
  }
}

// (isCheck && func()) || func2();
function deleteZero(number) {
  return ((number[0] === '0') ? number.substr(1, number.length) : number);
}

function operatorButtonclicked(value) {
  expression.push(value.slice(0, value.length - 1));
  expression.push(value[value.length - 1]);

  if (expression.length > 2) {
    const result = calculationExpressions[expression[1]](expression[0], expression[2]);
    expression.length = 0;
    expression.push(result);
    render(result);
    expression.push(value[value.length - 1]);
  }

  if (value === '=') {
    expression.length = 0;
    flag = false;
  }
  flag = false;
}

function render(numberValue = 0) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <div>

        {deleteZero(numberValue)}
      </div>
      <div className="buttons">
        <div>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
              <button type="button" onClick={() => { buttonClicked(`${numberValue}${i}`); }}>
                {i}
              </button>
            ))
          }
        </div>
        <div>
          {
            ['+', '-', '/', '*', '='].map((i) => (
              <button type="button" onClick={() => { operatorButtonclicked(`${numberValue}${i}`); }}>
                {i}
              </button>
            ))
          }
        </div>

      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
