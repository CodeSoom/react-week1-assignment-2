/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, num]) => {
    element[key.toLowerCase()] = num;
  });

  children.flat().forEach(child => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

createElement();

// let 변수를 하나도 안만들고도 가능한거였구나.

const initialState = {
  accumulator: 0,
  number: 0,
  operator: ""
};

// 와 연산자 계산을 조건문을 이용하는게 아니라 객체로 만들어서 사용할 줄은 몰랐다.
// 확실히 복잡한 조건문들보다 직관적이다.
const operatorFunctions = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y
};

// 이런식으로 연산들을 함수로 분리하는 것도 고려하자.
// function plus(x, y) {
//   return x + y;
// }

// function minus(x, y) {
//   return x - y;
// }

// function multiple(x, y) {
//   return x * y;
// }

// function division(x,y) {
//   return x/y;
// }

function defaultFunction(x, y) {
  return x || y;
}

function calculate(operator, accumulator, number) {
  // 연산자 입력이 아닐때는 기존에 있던 숫자만을 보여준다.
  return (operatorFunctions[operator] || defaultFunction)(accumulator, number);
}

function render({ accumulator, number, operator }) {
  function handleClickReset() {
    render(initialState);
  }

  function handleClickNumber(value) {
    // 숫자를 누를 때마다 자릿수를 변경해주면서 입력값을 반영해준다.

    render({
      accumulator,
      number: number * 10 + value,
      operator
    });
  }

  function handleClickOperator(value) {
    render({
      accumulator: calculate(operator, accumulator, number),
      number: 0,
      operator: value
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number || accumulator}</p>

      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
          <button type="button" onClick={() => handleClickNumber(num)}>
            {num}
          </button>
        ))}
      </p>

      <p>
        {["+", "-", "*", "/", "="].map(oper => (
          <button type="button" onClick={() => handleClickOperator(oper)}>
            {oper}
          </button>
        ))}

        <button type="button" onClick={() => handleClickReset()}>
          Reset
        </button>
      </p>
    </div>
  );

  const app = document.getElementById("app");
  app.textContent = "";
  app.appendChild(element);
}

render(initialState);
