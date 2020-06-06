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

const last = (arr) => arr[arr.length - 1];

const dropLast = (arr) => arr.slice(0, -1);

const isNumber = (value) => typeof value === 'number';

const isOperator = (value) => ['+', '-', '*', '/'].includes(value);

const isEqualSign = (value) => value === '=';

const isReadyToCalculate = (arr) => arr.length === 3;

const isReadyToSetOperator = (arr) => arr.length === 1;

function getResultForDisplay(arr) {
  const numbers = arr.filter(isNumber);
  return last(numbers);
}

function calculate(firstOperand, operator, secondOperand) {
  const formula = {
    '+': (first, second) => first + second,
    '-': (first, second) => first - second,
    '*': (first, second) => first * second,
    '/': (first, second) => first / second,
  };

  return formula[operator](firstOperand, secondOperand);
}

function setElement(result, repository, handleClick) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/'];

  return (
    <div>
      <p>간단 계산기</p>
      <p>{ result }</p>
      <p>
        {
          numbers.map(
            (i) => (
              <button type="button" onClick={() => handleClick.number(i, repository)}>
                {i}
              </button>
            ),
          )
        }
      </p>
      <p>
        {
          operators.map(
            (i) => (
              <button type="button" onClick={() => handleClick.operator(i, repository)}>
                {i}
              </button>
            ),
          )
        }
        <button type="button" onClick={() => handleClick.equal(repository)}>=</button>
      </p>

    </div>
  );
}

function render(repository) {
  const handleClick = {
    number: (number, currentRepository) => {
      const lastValue = last(currentRepository);

      if (isNumber(lastValue)) {
        const valuesExceptLast = dropLast(currentRepository);
        render([...valuesExceptLast, (lastValue * 10 + number)]);
      } else if (isOperator(lastValue)) {
        render([...currentRepository, number]);
      } else if (isEqualSign(lastValue)) {
        render([number]);
      }
    },
    operator: (operator, currentRepository) => {
      if (isReadyToCalculate(currentRepository)) {
        const newValue = calculate(...currentRepository);
        render([newValue, operator]);
      } else if (isReadyToSetOperator(currentRepository)) {
        render([...currentRepository, operator]);
      }
    },
    equal: (currentRepository) => {
      if (isReadyToCalculate(currentRepository)) {
        const newValue = calculate(...currentRepository);
        render([newValue, '=']);
      }
    },
  };

  const result = getResultForDisplay(repository);

  const element = setElement(result, repository, handleClick);

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

const initialRepository = [0];

render(initialRepository);
