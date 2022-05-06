/* eslint-disable no-param-reassign */
/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    const keyName = key === 'className' ? key : key.toLowerCase();
    element[keyName] = value;
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

function calculators(operator) {
  switch (operator) {
  case '+':
    return (pre, next) => pre + next;
  case '-':
    return (pre, next) => pre - next;
  case '*':
    return (pre, next) => pre * next;
  case '/':
    return (pre, next) => pre / next;
  default:
    return null;
  }
}

const NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const OPERATORS = ['+', '-', '*', '/', '='];

function initialProps() {
  return {
    displayNumber: 0, number1: [], number2: [], calculator: null,
  };
}

function render(props = { ...initialProps() }) {
  const {
    displayNumber, number1, number2,
  } = props;

  const results = () => {
    const value1 = Number(number1.join(''));
    const value2 = Number(number2.join(''));
    const result = props.calculator(value1, value2);
    return result;
  };

  const handleCalculator = (operator) => {
    if (props.calculator && !number2.length) {
      props.calculator = calculators(operator);
      return;
    }

    if (props.calculator && operator !== '=') {
      const result = results();

      render({
        displayNumber: result,
        number1: [result],
        number2: [],
        calculator: calculators(operator),
      });

      return;
    }

    if (operator === '=') {
      const result = props.calculator ? results() : displayNumber;

      render({
        ...initialProps(), displayNumber: result,
      });

      return;
    }

    props.calculator = calculators(operator);
  };

  const handleDisplayNumber = (number) => {
    const target = !props.calculator ? number1 : number2;

    target.push(number);
    render({ ...props, displayNumber: Number(target.join('')) });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayNumber}</p>
      <div>
        {NUMBERS.map((number) => (
          <button
            type="button"
            onClick={() => handleDisplayNumber(number)}
          >
            {(number)}
          </button>
        ))}
      </div>
      <div className="operators">
        {OPERATORS.map((operator) => (
          <button type="button" onClick={() => handleCalculator(operator)}>
            {operator}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
