/* eslint-disable no-nested-ternary */
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

function render() {
  const operand1 = [];
  const operand2 = [];
  const opStack = [];
  let show = 0;
  let clicked = false;
  let clickOp = false;
  let clickEq = false;

  const updateShow = (number) => {
    show = number;
    document.querySelector('#show').innerHTML = number;
  };
  const pushToNumber = (number) => {
    clickOp = false;
    clickEq = false;
    if (clicked) {
      operand2.push(number);
      updateShow(Number(operand2.join('')));
    } else {
      operand1.push(number);
      updateShow(Number(operand1.join('')));
    }
  };
  const resetOperand = (no) => {
    if (no === 'all') {
      const lengthOp1 = operand1.length;
      for (let i = 0; i < lengthOp1; i += 1) {
        operand1.pop();
      }
      const lengthOp2 = operand2.length;
      for (let i = 0; i < lengthOp2; i += 1) {
        operand2.pop();
      }
      const lengStack = opStack.length;
      for (let i = 0; i < lengStack; i += 1) {
        opStack.pop();
      }
    } else if (no) {
      const lengthOp1 = operand1.length;
      for (let i = 0; i < lengthOp1; i += 1) {
        operand1.pop();
      }
    } else {
      const lengthOp2 = operand2.length;
      for (let i = 0; i < lengthOp2; i += 1) {
        operand2.pop();
      }
    }
  };

  const calculateResult = () => {
    let result = opStack[0];
    let preOp;
    opStack.forEach((value) => {
      if (typeof value === 'string') {
        preOp = value;
      } else {
        if (preOp === '+') result += value;
        if (preOp === '-') result -= value;
        if (preOp === '*') result *= value;
        if (preOp === '/') result /= value;
      }
    });
    return result;
  };

  const onClickOperator = (op) => {
    switch (op) {
    case '+':
    case '-':
    case '*':
    case '/': {
      if (opStack.length) {
        onClickOperator('=');
        if (operand1.length) {
          opStack.push(Number(operand1.join('')));
        } else if (operand2.length) {
          opStack.push(Number(operand2.join('')));
        }
        console.log(opStack);
        const result = calculateResult();
        updateShow(result);
      }
      if (clickOp) {
        opStack[opStack.length - 1] = op;
        return;
      }
      if (opStack.length === 0 && operand1.length === 0) {
        return;
      }

      clickOp = true;
      if (clicked) {
        opStack.push(Number(operand2.join('')));
        opStack.push(op);
        resetOperand(false);
        clicked = false;
      } else {
        opStack.push(Number(operand1.join('')));
        opStack.push(op);
        resetOperand(true);
        clicked = true;
      }
      break;
    }
    case '=': {
      if (!clickEq) {
        if (operand1.length) {
          opStack.push(Number(operand1.join('')));
        } else if (operand2.length) {
          opStack.push(Number(operand2.join('')));
        }
        if (opStack.length) {
          const result = calculateResult();
          // let result = opStack[0];
          // let preOp;
          // opStack.forEach((value) => {
          //   if (typeof value === 'string') {
          //     preOp = value;
          //   } else {
          //     if (preOp === '+') result += value;
          //     if (preOp === '-') result -= value;
          //     if (preOp === '*') result *= value;
          //     if (preOp === '/') result /= value;
          //   }
          // });
          updateShow(result);
          clickEq = true;
          clicked = false;
          clickOp = false;
          resetOperand('all');
          operand1.push(result);
        }
      }
      break;
    }
    default: { break; }
    }
  };


  const element = (
    <div id="main">
      <p>간단 계산기</p>
      <p id="show">0</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => <button type="button" onClick={() => pushToNumber(n)}>{n}</button>)}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((o) => <button type="button" onClick={() => onClickOperator(o)}>{o}</button>)}
      </p>
    </div>

  );


  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
