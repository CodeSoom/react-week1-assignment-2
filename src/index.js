/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-use-before-define */

/* @jsx createElement */

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const operators = ['+', '-', '*', '/'];

const initialState = {
  term1: 0,
  term2: 0,
  operator: '',
  display: '',
};

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

function handleClickNumber(state, clicked) {
  const { term1, term2, operator } = state;

  const setTerm = (term, input) => (term === 0 ? input : term * 10 + clicked);

  const newTerm1 = (operator === '') ? setTerm(term1, clicked) : term1;

  const newTerm2 = (operator !== '') ? setTerm(term2, clicked) : term2;

  const newDisplay = (operator === '') ? newTerm1 : newTerm2;

  render({
    term1: newTerm1,
    term2: newTerm2,
    operator,
    display: newDisplay,
  });
}

function getResult(state) {
  const { term1, term2, operator } = state;

  let result = null;

  switch (operator) {
  case '+':
    result = term1 + term2;
    break;
  case '-':
    result = term1 - term2;
    break;
  case '*':
    result = term1 * term2;
    break;
  case '/':
    result = term1 / term2;
    break;
  default:
    console.error('사칙연산이 아닙니다');
  }
  return result;
}

function handleClickOperator(state, clicked) {
  const {
    term1, term2, operator, display,
  } = state;

  if (operator === '') {
    render({
      term1,
      term2,
      operator: clicked,
      display,
    });
  } else {
    const result = getResult(state);
    render({
      term1: result,
      term2: 0,
      operator: clicked,
      display: result,
    });
  }
}

function handleClickResult(state) {
  const result = getResult(state);

  render({
    term1: result,
    term2: 0,
    operator: state.operator,
    display: result,
  });
}

function render(state) {
  const element = (
    <div>
      <p>
        간단 계산기
      </p>
      <p>
        { state.display }
      </p>
      <p>
        {numbers.map((number) => (
          <button type="button" onClick={() => handleClickNumber(state, number)}>
            { number }
          </button>
        ))}
      </p>
      <p>
        {operators.map((operator) => (
          <button type="button" onClick={() => handleClickOperator(state, operator)}>
            { operator }
          </button>
        ))}
        <button type="button" onClick={() => handleClickResult(state)}>
          =
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
