/* eslint-disable indent */
/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const createElement = (tagName, props, ...children) => {
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
};

const render = ({
  firstNumber, secondNumber, displayedNumber, operator,
}) => {
  const parameters = {
    firstNumber: [...firstNumber],
    secondNumber: [...secondNumber],
    displayedNumber,
    operator: [...operator],
  };

  const setArrayToNumber = (inputArray) => parseInt(inputArray.reduce((total, current) => total + current, ''), 10);

  const handleNumberClick = (input) => {
    const currentNumber = operator.length
      ? setArrayToNumber([...secondNumber, input])
      : setArrayToNumber([...firstNumber, input]);

    if (operator.length) {
      parameters.secondNumber = [...secondNumber, input];
      parameters.displayedNumber = currentNumber;
      render(parameters);

      return;
    }

    parameters.firstNumber = [...firstNumber, input];
    parameters.displayedNumber = currentNumber;
    render(parameters);
  };

  const handleOperatorClick = (currentOperator) => {
    if (parameters.operator.length === 0 && currentOperator === '=') {
      return;
    }

    parameters.operator = [...operator, currentOperator];
    const operators = parameters.operator;
    const isFirstOperation = operators.length <= 1;

    if (isFirstOperation) {
      render(parameters);

      return;
    }

    const previousOperator = operators.slice(operators.length - 2, operators.length - 1)[0];
    const setParameters = () => {
      parameters.secondNumber = [0];
      parameters.displayedNumber = parameters.firstNumber;
    };

    const doCalcurate = (operatorSymbol) => {
      switch (operatorSymbol) {
        case '+':
          parameters.firstNumber = [setArrayToNumber(firstNumber) + setArrayToNumber(secondNumber)];
          setParameters();
          render(parameters);

          return parameters.firstNumber[0];
        case '-':
          parameters.firstNumber = [setArrayToNumber(firstNumber) - setArrayToNumber(secondNumber)];
          setParameters();
          render(parameters);

          return parameters.firstNumber[0];
        case '*':
          parameters.firstNumber = [setArrayToNumber(firstNumber) * setArrayToNumber(secondNumber)];
          setParameters();
          render(parameters);

          return parameters.firstNumber[0];
        case '/':
          parameters.firstNumber = [setArrayToNumber(firstNumber) / setArrayToNumber(secondNumber)];
          setParameters();
          render(parameters);

          return parameters.firstNumber[0];
        default:
          throw new Error('Invalid operator');
      }
    };

    if (currentOperator === '=') {
      render({
        firstNumber: [0],
        secondNumber: [0],
        displayedNumber: doCalcurate(previousOperator),
        operator: [],
      });

      return;
    }

    doCalcurate(previousOperator);
  };

  const element = (
    <div>
      <h1 id="title">간단 계산기</h1>
      <p className="result">{displayedNumber}</p>
      <div>
        {new Array(10).fill().map((_, index) => {
          if (index === 9) {
            return (
              <button type="button" onClick={() => handleNumberClick(0)}>
                {0}
              </button>
            );
          }

          return (
            <button type="button" onClick={() => handleNumberClick(index + 1)}>
              {index + 1}
            </button>
          );
        })}
      </div>
      <br />
      <div>
        {['+', '-', '*', '/', '='].map((symbols) => (
          <button type="button" onClick={() => handleOperatorClick(symbols)}>
            {symbols}
          </button>
        ))}
      </div>
    </div>
  );

  const renderPage = () => {
    document.getElementById('app').textContent = '';
    document.getElementById('app').appendChild(element);
  };

  renderPage();
};

render({
  firstNumber: [0],
  secondNumber: [0],
  displayedNumber: 0,
  operator: [],
});
