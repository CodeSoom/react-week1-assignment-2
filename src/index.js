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

let viewNumber = 0;
let currentNumber = 0;
let operatNumber = 0;
let operator = null;

const calculatorReset = () => {
  currentNumber = 0;
  operator = null;
  operatNumber = 0;
};
const showCurrentNumber = () => {
  return currentNumber;
};
const setNumber = (value) => {
  if (!operator) {
    currentNumber = currentNumber ? parseInt((currentNumber += String(value)), 10) : value;
    viewNumber = currentNumber;
  } else {
    operatNumber = operatNumber ? parseInt((operatNumber += String(value)), 10) : value;
    viewNumber = operatNumber;
  }

  console.log(
    viewNumber,
currentNumber,
operatNumber,
operator
  );
};
const operatResult = () => {
  switch (operator) {
  case '+': {
    currentNumber += operatNumber;
    viewNumber = currentNumber;
    break;
  }
  case '-': {
    currentNumber -= operatNumber;
    viewNumber = currentNumber;
    break;
  }
  case '*': {
    currentNumber *= operatNumber;
    viewNumber = currentNumber;
    break;
  }
  case '/': {
    currentNumber /= operatNumber;
    viewNumber = currentNumber;
    break;
  }
  case '=': {
    currentNumber = parseInt(currentNumber, 10) / parseInt(operatNumber, 10);
    viewNumber = currentNumber;
    calculatorReset();
    break;
  }
  default: {
    break;
  }
  }
  operatNumber = 0;
};
const setOperator = (opt) => {
  operator && operatResult();
  operator = opt;
};


function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <h1 id="result">{viewNumber}</h1>
      <div>
        <button
          type="button"
          onClick={() => {
            setNumber(1);
            render();
          }}
        >
          1
        </button>
        <button
          type="button"
          onClick={() => {
            setNumber(2);
            render();
          }}
        >
          2
        </button>
        <button
          type="button"
          onClick={() => {
            setNumber(3);
            render();
          }}
        >
          3
        </button>
        <button
          type="button"
          onClick={() => {
            setNumber(4);
            render();
          }}
        >
          4
        </button>
        <button
          type="button"
          onClick={() => {
            setNumber(5);
            render();
          }}
        >
          5
        </button>
        <button
          type="button"
          onClick={() => {
            setNumber(6);
            render();
          }}
        >
          6
        </button>
        <button
          type="button"
          onClick={() => {
            setNumber(7);
            render();
          }}
        >
          7
        </button>
        <button
          type="button"
          onClick={() => {
            setNumber(8);
            render();
          }}
        >
          8
        </button>
        <button
          type="button"
          onClick={() => {
            setNumber(9);
            render();
          }}
        >
          9
        </button>
        <button
          type="button"
          onClick={() => {
            setNumber(0);
            render();
          }}
        >
          0
        </button>
      </div>

      <div style="margin-top:20px;">
        <button
          type="button"
          onClick={() => {
            setOperator('+');
            render();
          }}
        >
          +
        </button>
        <button
          type="button"
          onClick={() => {
            setOperator('-');
            render();
          }}
        >
          -
        </button>
        <button
          type="button"
          onClick={() => {
            setOperator('*');
            render();
          }}
        >
          *
        </button>
        <button
          type="button"
          onClick={() => {
            setOperator('/');
            render();
          }}
        >
          /
        </button>
        <button
          type="button"
          onClick={() => {
            operatResult();
            render();
          }}
        >
          =
        </button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
