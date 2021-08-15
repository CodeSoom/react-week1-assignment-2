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

const TYPE = {
  OPERATOR: 'o',
  NUMBER: 'n',
  RESULT: 'r',
};

const initialState = {
  number: '0', preInputType: TYPE.NUMBER, stack: ['0'],
};

const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const operators = {
  '+': (num1, num2) => +num1 + +num2,
  '-': (num1, num2) => +num1 - +num2,
  '*': (num1, num2) => +num1 * +num2,
  '/': (num1, num2) => +num1 / +num2,
};

const getType = (input) => {
  if (input === '=') return TYPE.RESULT;
  return operators[input] ? TYPE.OPERATOR : TYPE.NUMBER;
};

const inputHandlers = {
  calculate(stack) {
    while (stack.length > 1) {
      const num1 = stack.shift();
      const op = stack.shift();
      const num2 = stack.shift();
      stack.unshift(operators[op](num1, num2));
    }
    return stack[0];
  },
  [TYPE.NUMBER + TYPE.NUMBER](input, stack) {
    const lastToken = stack.pop();
    const number = `${+(lastToken + input)}`;
    stack.push(number);
    return {
      number,
      preInputType: TYPE.NUMBER,
      stack,
    };
  },
  [TYPE.OPERATOR + TYPE.NUMBER](input, stack) {
    const number = input;
    stack.push(number);
    return {
      number,
      preInputType: TYPE.NUMBER,
      stack,
    };
  },
  [TYPE.NUMBER + TYPE.OPERATOR](input, stack) {
    let newStack = [...stack];
    if (newStack.length > 2) {
      newStack = [this.calculate(newStack)];
    }
    const number = newStack[newStack.length - 1];
    newStack.push(input);
    return {
      number,
      preInputType: TYPE.OPERATOR,
      stack: newStack,
    };
  },
  [TYPE.OPERATOR + TYPE.OPERATOR](input, stack) {
    stack.pop();
    return this[TYPE.NUMBER + TYPE.OPERATOR](input, stack);
  },
  [TYPE.NUMBER + TYPE.RESULT](input, stack) {
    return {
      number: `${this.calculate(stack)}`,
      preInputType: TYPE.RESULT,
      stack,
    };
  },
  [TYPE.OPERATOR + TYPE.RESULT](input, stack) {
    stack.pop();
    return this[TYPE.NUMBER + TYPE.RESULT](input, stack);
  },
  [TYPE.RESULT + TYPE.NUMBER](input, stack) {
    const number = input;
    return {
      number,
      preInputType: TYPE.NUMBER,
      stack: [number],
    };
  },
  [TYPE.RESULT + TYPE.OPERATOR](input, stack) {
    const number = stack[stack.lenth - 1];
    return {
      number,
      preInputType: TYPE.NUMBER,
      stack: [number, input],
    };
  },
};

function render({
  number, preInputType, stack,
}) {
  const handleInput = (input, _preInputType, _stack) => {
    const handlerType = _preInputType + getType(input);
    render(inputHandlers[handlerType](input, _stack));
  };

  const rootNode = document.getElementById('app');

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number}</p>
      <p>
        {digits.map((digit) => <button type="button" onClick={() => { handleInput(digit, preInputType, stack); }}>{digit}</button>)}
      </p>
      <p>
        {Object.keys(operators).map((operator) => <button type="button" onClick={() => { handleInput(operator, preInputType, stack); }}>{operator}</button>)}
        <button type="button" onClick={() => { handleInput('=', preInputType, stack); }}>=</button>
      </p>
      <p>
        <button
          type="button"
          onClick={() => { render({ number: '0', preInputType: TYPE.NUMBER, stack: ['0'] }); }}
        >
          clear
        </button>
      </p>
    </div>
  );

  rootNode.textContent = '';
  rootNode.appendChild(element);
}

render(initialState);
