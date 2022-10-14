/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension,
no-unused-vars, max-classes-per-file */

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

class Calculate {
  static add(num1, num2) {
    return num1 + num2;
  }

  static subtract(num1, num2) {
    return num1 - num2;
  }

  static divide(num1, num2) {
    return num1 / num2;
  }

  static multiple(num1, num2) {
    return num1 * num2;
  }
}

class CalculateState {
  constructor({
    displayNumber,
    result,
    operator,
    prevInput,
  }) {
    this.displayNumber = displayNumber;
    this.result = result;
    this.operator = operator;
    this.prevInput = prevInput;
  }
}

const calculateCoupler = {
  '+': Calculate.add,
  '-': Calculate.subtract,
  '/': Calculate.divide,
  '*': Calculate.multiple,
};

function render(state) {
  const handleClickNumber = (num) => {
    const newDisplayNumber = typeof state.prevInput === 'number' ? state.displayNumber * 10 + num : num;

    const newState = new CalculateState({
      ...state,
      displayNumber: newDisplayNumber,
      prevInput: num,
    });
    render(newState);
  };

  const handleClickOperator = (operator) => {
    const newResult = calculateCoupler[state.operator]
      ? calculateCoupler[state.operator](state.result, state.displayNumber)
      : state.displayNumber;

    const newState = new CalculateState(
      {
        operator,
        prevInput: operator,
        result: newResult,
        displayNumber: newResult,
      },
    );
    render(newState);
  };

  const handleClick = (input) => {
    if (typeof input === 'number') {
      handleClickNumber(input);
    } else {
      handleClickOperator(input);
    }
  };

  const calculatorTemplate = (
    <div>
      <div>{state.displayNumber}</div>
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button type="button" onClick={() => handleClick(num)}>{num}</button>
        ))}
      </div>
      <div>
        {['+', '-', '*', '/', '='].map((operator) => (
          <button type="button" onClick={() => handleClick(operator)}>{operator}</button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(calculatorTemplate);
}

const initState = {
  displayNumber: 0,
  result: null,
  operator: null,
  prevInput: null,
};

render(initState);
