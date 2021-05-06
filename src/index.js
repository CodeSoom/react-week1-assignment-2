/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* eslint-enable eslint-plugin-react */
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
