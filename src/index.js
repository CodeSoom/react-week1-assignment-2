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

function setElement(result, repository, handleClickNumber, handleClickOperator, handleClickEqual) {
  // console.log(result);
  // console.log(repository);

  return (
    <div>
      <p>간단 계산기</p>
      <p>{ result }</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (<button type="button" onClick={() => handleClickNumber(i, repository)}>{i}</button>))}
      </p>
      <p>
        {['+', '-', '*', '/'].map((i) => (<button type="button" onClick={() => handleClickOperator(i, repository)}>{i}</button>))}
        <button type="button" onClick={() => handleClickEqual(repository)}>=</button>
      </p>

    </div>
  );
}

function render(result, repository) {
  const isOperand = (value) => typeof value === 'number';

  const isOperator = (value) => ['+', '-', '*', '/'].includes(value);

  const isEqualSign = (value) => value === '=';

  const readyToCalculate = (values) => values.length === 3;

  const readyToSetOperator = (values) => values.length === 1;

  const getResultForDisplay = (values) => values.filter(isOperand).slice(-1)[0];

  // const hasOperator = (values) => values.filter(isOperator).length > 0;

  // const isEqualitySign = (value) => value === '=';

  const calculate = (firstOperand, operator, secondOperand) => {
    console.log(operator);
    switch (operator) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '*':
      return firstOperand * secondOperand;
    case '/':
      return firstOperand / secondOperand;
    default:
      return;
    }
  };

  const handleClickNumber = (number, currentRepository) => {
    const lastValue = currentRepository.pop();
    if (isOperand(lastValue)) {
      const newValue = lastValue * 10 + number;
      currentRepository.push(newValue);
      console.log(currentRepository);
    } else if (isOperator(lastValue)) {
      currentRepository.push(lastValue, number);
      console.log(currentRepository);
    } else if (isEqualSign(lastValue)) {
      currentRepository.splice(0, currentRepository.length);
      currentRepository.push(number);
    }

    const newResult = getResultForDisplay(currentRepository);

    render(newResult, currentRepository);
  };

  const handleClickOperator = (operator, currentRepository) => {

    if (readyToCalculate(currentRepository)) {
      const newValue = calculate(...currentRepository);
      currentRepository.splice(0, currentRepository.length);
      currentRepository.push(newValue, operator);
      console.log(currentRepository);
    } else if (readyToSetOperator(currentRepository)) {
      currentRepository.push(operator);
      console.log(currentRepository);
    }

    const newResult = getResultForDisplay(currentRepository);

    render(newResult, currentRepository);
  };

  const handleClickEqual = (currentRepository) => {
    if (readyToCalculate(currentRepository)) {
      const newValue = calculate(...currentRepository);
      currentRepository.splice(0, currentRepository.length);
      currentRepository.push(newValue, '=');
      console.log(currentRepository);
    }

    const newResult = getResultForDisplay(currentRepository);
    render(newResult, currentRepository);
  };

  const element = setElement(result, repository, handleClickNumber, handleClickOperator, handleClickEqual);

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

const initialResult = 0;
const initialRepository = [0];

render(initialResult, initialRepository);
