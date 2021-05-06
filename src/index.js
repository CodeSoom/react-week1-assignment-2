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

const elements = {
  result: 0,
  number1: '',
  sign: '',
  number2: '',
};

const initState = {
  result: 0,
  num1: '',
  operator: '',
  num2: '',
};

function render(resultState) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];

  const calculate = (state) => ({
    '+': Number(state.num1) + Number(state.num2),
    '-': Number(state.num1) - Number(state.num2),
    '*': Number(state.num1) * Number(state.num2),
    '/': Number(state.num1) / Number(state.num2),
  })[state.operator];

  const calculator = (state, item) => {
    const result = calculate(state);
    const num1 = (item ? result : '');
    const operator = item || '';
    const num2 = '';

    render({
      result,
      num1,
      operator,
      num2,
    });
  };

  const handleClickItem = (item, state) => {
    if (item === '=') {
      calculator(state);
      return;
    }

    const newState = { ...state };

    if (typeof item === 'string') {
      if (state.operator !== '') {
        calculator(state, item);
        return;
      }
      newState.operator = item;
    }

    if (typeof item === 'number') {
      newState.num1 = state.num1 + (newState.operator === '' ? item : '');
      newState.num2 = state.num2 + (newState.operator === '' ? '' : item);
    }

    render(newState);
  };

  const viewNumber = (state) => {
    if (state.num1 === '') {
      return state.result;
    }

    if (state.operator === '' || state.num2 === '') {
      return state.num1;
    }

    return state.num2;
  };

  const result = viewNumber(resultState);

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {result}
      </p>
      <p>
        {numbers.map((num) => (
          <button type="button" onClick={() => handleClickItem(num, resultState)}>{num}</button>
        ))}
      </p>
      <p>
        {operators.map((operator) => (
          <button type="button" onClick={() => handleClickItem(operator, resultState)}>{operator}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initState);

// const calculator = (item) => {
//   const num1 = Number(elements.number1);
//   const num2 = Number(elements.number2);
//
//   switch (elements.sign) {
//   case '+':
//     elements.result = num1 + num2;
//     break;
//   case '-':
//     elements.result = num1 - num2;
//     break;
//   case '*':
//     elements.result = num1 * num2;
//     break;
//   case '/':
//     elements.result = num1 / num2;
//     break;
//   default:
//     return '';
//   }
//
//   if (item) {
//     elements.number1 = elements.result;
//   } else {
//     elements.number1 = '';
//   }
//   elements.number2 = '';
//   render();
//   return item || '';
// };
//
// const handleClickItem = (item, state) => {
//   const {num1, operator, num2} = state;
//
//   if (item === '=') {
//     calculator();
//     return;
//   }
//
//   if (typeof item === 'string') {
//     elements.sign = (elements.sign !== '' ? calculator(item) : item);
//     return;
//   }
//
//   const number1 = (operator === '' ? item : '');
//   const number2 = (operator === '' ? '' : item);
//
//   render();
// };
//
// const viewNumber = () => {
//   if (elements.number1 === '') {
//     return elements.result;
//   }
//
//   if (elements.sign === '') {
//     return elements.number1;
//   }
//
//   if (Number(elements.number1) && elements.number2 === '') {
//     return elements.number1;
//   }
//
//   return elements.number2;
// };
//
// elements.result = viewNumber();
