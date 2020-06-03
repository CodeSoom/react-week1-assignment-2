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
const setCurrentNumber = (value) => {
  if (!operator) {
    currentNumber = currentNumber ? (currentNumber += String(value)) : value;
    viewNumber = currentNumber;
  } else {
    operatNumber = operatNumber ? (operatNumber += String(value)) : value;
    viewNumber = operatNumber;
  }

  console.log(parseInt(currentNumber, 10), operator, parseInt(operatNumber, 10));
};
const setOperator = (opt) => {
  operator = opt;

  console.log(parseInt(currentNumber, 10));
  console.log(operator);
};
const operatResult = () => {
  switch (operator) {
  case '+': {
    currentNumber = parseInt(currentNumber, 10) + parseInt(operatNumber, 10);
    break;
  }
  case '-': {
    currentNumber = parseInt(currentNumber, 10) - parseInt(operatNumber, 10);
    break;
  }
  case '*': {
    currentNumber = parseInt(currentNumber, 10) * parseInt(operatNumber, 10);
    break;
  }
  case '/': {
    currentNumber = parseInt(currentNumber, 10) / parseInt(operatNumber, 10);
    break;
  }
  default: {
    break;
  }
  }
  viewNumber = currentNumber;
  calculatorReset();
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
            setCurrentNumber(1);
            render();
          }}
        >
          1
        </button>
        <button
          type="button"
          onClick={() => {
            setCurrentNumber(2);
            render();
          }}
        >
          2
        </button>
        <button
          type="button"
          onClick={() => {
            setCurrentNumber(3);
            render();
          }}
        >
          3
        </button>
        <button
          type="button"
          onClick={() => {
            setCurrentNumber(4);
            render();
          }}
        >
          4
        </button>
        <button
          type="button"
          onClick={() => {
            setCurrentNumber(5);
            render();
          }}
        >
          5
        </button>
        <button
          type="button"
          onClick={() => {
            setCurrentNumber(6);
            render();
          }}
        >
          6
        </button>
        <button
          type="button"
          onClick={() => {
            setCurrentNumber(7);
            render();
          }}
        >
          7
        </button>
        <button
          type="button"
          onClick={() => {
            setCurrentNumber(8);
            render();
          }}
        >
          8
        </button>
        <button
          type="button"
          onClick={() => {
            setCurrentNumber(9);
            render();
          }}
        >
          9
        </button>
        <button
          type="button"
          onClick={() => {
            setCurrentNumber(0);
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
          }}
        >
          +
        </button>
        <button
          type="button"
          onClick={() => {
            setOperator('-');
          }}
        >
          -
        </button>
        <button
          type="button"
          onClick={() => {
            setOperator('*');
          }}
        >
          *
        </button>
        <button
          type="button"
          onClick={() => {
            setOperator('/');
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
