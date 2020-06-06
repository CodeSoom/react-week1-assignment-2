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

function isNumber(value) {
  return typeof value === 'number';
}

function isOperator(value) {
  return ['+', '-', '*', '/'].includes(value);
}

function isEqualSign(value) {
  return value === '=';
}

function isReadyToCalculate(values) {
  return values.length === 3;
}

function isReadyToSetOperator(values) {
  return values.length === 1;
}

function getResultForDisplay(values) {
  return values
    .filter((value) => typeof value === 'number')
    .slice(-1)[0];
}

function calculate(firstOperand, operator, secondOperand) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  }
  if (operator === '-') {
    return firstOperand - secondOperand;
  }
  if (operator === '*') {
    return firstOperand * secondOperand;
  }
  if (operator === '/') {
    return firstOperand / secondOperand;
  }
  return 0;
}

function Calculator(result, repository, handleClick) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/'];
  const {
    handleClickNumber,
    handleClickOperator,
    handleClickEqual,
  } = handleClick;

  return (
    <div>
      <p>간단 계산기</p>
      <p>{ result }</p>
      <p>
        {
          numbers.map(
            (i) => (
              <button type="button" onClick={() => handleClickNumber(i, repository)}>
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
              <button type="button" onClick={() => handleClickOperator(i, repository)}>
                {i}
              </button>
            ),
          )
        }
        <button type="button" onClick={() => handleClickEqual(repository)}>=</button>
      </p>

    </div>
  );
}

function render(repository) {
  const handleClick = {
    handleClickNumber: (number, currentRepository) => {
      const lastValue = currentRepository[currentRepository.length - 1];
      const valuesExceptLast = currentRepository
        .slice(0, currentRepository.length - 1);

      if (isNumber(lastValue)) {
        render([...valuesExceptLast, (lastValue * 10 + number)]);
      } else if (isOperator(lastValue)) {
        render([...currentRepository, number]);
      } else if (isEqualSign(lastValue)) {
        render([number]);
      }
    },
    handleClickOperator: (operator, currentRepository) => {
      if (isReadyToCalculate(currentRepository)) {
        const newValue = calculate(...currentRepository);
        render([newValue, operator]);
      } else if (isReadyToSetOperator(currentRepository)) {
        render([...currentRepository, operator]);
      }
    },
    handleClickEqual: (currentRepository) => {
      if (isReadyToCalculate(currentRepository)) {
        const newValue = calculate(...currentRepository);
        render([newValue, '=']);
      }
    },
  };

  const result = getResultForDisplay(repository);

  const element = Calculator(result, repository, handleClick);

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

const initialRepository = [0];

render(initialRepository);
