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

let operand1 = "";
let operator = "";
let operand2 = "";

function handleClickNumber(number) {
  console.log(
    `--------------------------------------------------------------------`
  );
  if (operand2 === "") {
    operand2 = String(number);
  } else {
    operand2 += String(number);
  }

  console.log(
    `1-1 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
  );

  render(Number(operand2));
}

function handleClickPlusNumber() {
  console.log(
    `--------------------------------(${number}+)------------------------------------`
  );
  console.log(
    `1 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
  );

  if (operator === "") {
    if (operand1 == "") {
      operand1 = operand2;
      operator = "+";
      console.log(
        `2-1 (1) operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
      );
    } else {
      
      console.log(
        `2-1 (2-1) operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
      );
      operand1 = Number(operand1) + Number(operand2);
      render(Number(operand1));
      // operator = "";
      console.log(
        `2-1 (2-2) operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
      );
    }

    
  } else {
    switch (operator) {
      case "+":
        operand1 = Number(operand1) + Number(operand2);
        break;
      case "-":
        operand1 = Number(operand1) - Number(operand2);
        break;
      case "*":
        operand1 = Number(operand1) * Number(operand2);
        break;
      case "/":
        operand1 = Number(operand1) / Number(operand2);
        break;
      default:
        break;
    }
    console.log(
      `2-2 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
    );

    render(Number(operand1));
    operator = "+";
  }
  console.log(
    `3 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
  );
  operand2 = "";
  console.log(
    `4 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
  );
}

function handleClickMinusNumber() {
  console.log(
    `-----------------------------(${number}-)---------------------------------------`
  );
  console.log(
    `1 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
  );

  if (operator === "") {
    if (operand1 == "") {
      operand1 = operand2;
      operator = "-";
    } else {


      
      operand1 = Number(operand1) - Number(operand2);
      render(Number(operand1));
      // operator = "";
    }

    console.log(
      `2-1 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
    );
  } else {
    switch (operator) {
      case "+":
        operand1 = Number(operand1) + Number(operand2);
        break;
      case "-":
        operand1 = Number(operand1) - Number(operand2);
        break;
      case "*":
        operand1 = Number(operand1) * Number(operand2);
        break;
      case "/":
        operand1 = Number(operand1) / Number(operand2);
        break;
      default:
        break;
    }
    console.log(
      `2-2 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
    );

    render(Number(operand1));
    operator = "-";
  }
  console.log(
    `3 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
  );
  operand2 = "";
  console.log(
    `4 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
  );
}

function handleClickMultiplyNumber() {
  console.log(
    `--------------------------------(${number}+)------------------------------------`
  );
  console.log(
    `1 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
  );

  if (operator === "") {
    if (operand1 == "") {
      operand1 = operand2;
      operator = "+";
      console.log(
        `2-1 (1) operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
      );
    } else {
      
      console.log(
        `2-1 (2-1) operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
      );
      operand1 = Number(operand1) + Number(operand2);
      render(Number(operand1));
      // operator = "";
      console.log(
        `2-1 (2-2) operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
      );
    }

    
  } else {
    switch (operator) {
      case "+":
        operand1 = Number(operand1) + Number(operand2);
        break;
      case "-":
        operand1 = Number(operand1) - Number(operand2);
        break;
      case "*":
        operand1 = Number(operand1) * Number(operand2);
        break;
      case "/":
        operand1 = Number(operand1) / Number(operand2);
        break;
      default:
        break;
    }
    console.log(
      `2-2 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
    );

    render(Number(operand1));
    operator = "+";
  }
  console.log(
    `3 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
  );
  operand2 = "";
  console.log(
    `4 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
  );
}

function handleClickDivideAddNumber() {
  console.log(
    `-----------------------------(${number}-)---------------------------------------`
  );
  console.log(
    `1 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
  );

  if (operator === "") {
    if (operand1 == "") {
      operand1 = operand2;
      operator = "-";
    } else {


      
      operand1 = Number(operand1) - Number(operand2);
      render(Number(operand1));
      // operator = "";
    }

    console.log(
      `2-1 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
    );
  } else {
    switch (operator) {
      case "+":
        operand1 = Number(operand1) + Number(operand2);
        break;
      case "-":
        operand1 = Number(operand1) - Number(operand2);
        break;
      case "*":
        operand1 = Number(operand1) * Number(operand2);
        break;
      case "/":
        operand1 = Number(operand1) / Number(operand2);
        break;
      default:
        break;
    }
    console.log(
      `2-2 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
    );

    render(Number(operand1));
    operator = "-";
  }
  console.log(
    `3 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
  );
  operand2 = "";
  console.log(
    `4 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
  );
}

function handleClickShowTotal() {
  
  switch (operator) {
    case "+":
      operand1 = Number(operand1) + Number(operand2);
      break;
    case "-":
      operand1 = Number(operand1) - Number(operand2);
      break;
    case "*":
      operand1 = Number(operand1) * Number(operand2);
      break;
    case "/":
      operand1 = Number(operand1) / Number(operand2);
      break;
    default:
      break;
  }
  console.log(
    `2-2 operand1(${operand1}) operator(${operator}) + operane2(${operand2})`
  );

  render(Number(operand1));
  operand1 = "";
  operator = "";
  operand2 = "";


}


function render(number = 0) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number}</p>
      <p>
        {numbers.map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        <button type="button" onClick={() => handleClickPlusNumber()}>
          +
        </button>
        <button type="button" onClick={() => handleClickMinusNumber()}>
          -
        </button>
        <button type="button" onClick={() => handleClickMultiplyNumber()}>
          *
        </button>
        <button
          type="button"
          onClick={() => handleClickDivideAddNumber()}
        >
          /
        </button>
        <button type="button" onClick={() => handleClickShowTotal()}>
          =
        </button>
      </p>
      <p />
    </div>
  );

  document.getElementById("app").textContent = "";
  document.getElementById("app").appendChild(element);
}

render();
