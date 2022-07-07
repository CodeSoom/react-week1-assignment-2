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

const operatorContainer = ['+', '-', '*', '/', '='];

const render = ({
  firstNumber, secondNumber, displayedNumber, operation,
}) => {
  const addNumber = ({ isFirstNumber, number }) => {
    const renderArguments = {
      firstNumber,
      secondNumber,
      displayedNumber,
      operation,
    };

    if (isFirstNumber) {
      renderArguments.firstNumber = parseInt(firstNumber + String(number), 10);
      renderArguments.displayedNumber = renderArguments.firstNumber;

      return renderArguments;
    }

    renderArguments.secondNumber = parseInt(secondNumber + String(number), 10);
    renderArguments.displayedNumber = renderArguments.secondNumber;

    return renderArguments;
  };

  const handleNumberClick = (number) => {
    const isFirstNumber = operation === null;
    const addedRenderArguments = addNumber({ isFirstNumber, number });

    render(addedRenderArguments);
  };

  const resultTable = (numbers) => {
    const [first, second] = numbers;
    const result = {
      '+': first + second,
      '-': first - second,
      '*': first * second,
      '/': first / second,
    };

    return result;
  };

  const doCalculation = ({ numbers, previousOperator, currentOperator }) => {
    const renderArguments = {
      firstNumber,
      secondNumber,
      displayedNumber,
      operation,
    };
    const result = resultTable(numbers)[previousOperator];

    if (currentOperator === '=') {
      renderArguments.firstNumber = 0;
      renderArguments.secondNumber = 0;
      renderArguments.displayedNumber = result;
      renderArguments.operation = null;

      return renderArguments;
    }

    renderArguments.firstNumber = result;
    renderArguments.secondNumber = 0;
    renderArguments.displayedNumber = result;
    renderArguments.operation = currentOperator;

    return renderArguments;
  };

  const handleOperatorClick = (currentOperator) => {
    if (operation === null && currentOperator === '=') {
      return;
    }

    const renderArguments = {
      firstNumber,
      secondNumber,
      displayedNumber,
      operation,
    };

    const doCalculationArgument = {
      numbers: [firstNumber, secondNumber],
      previousOperator: renderArguments.operation,
      currentOperator,
    };

    if (operation) {
      const calculationResult = doCalculation(doCalculationArgument);
      render(calculationResult);

      return;
    }

    renderArguments.operation = currentOperator;
    render(renderArguments);
  };

  const element = (
    <div>
      <h1 id="title">간단 계산기</h1>
      <p className="displayedNumber">{displayedNumber}</p>
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
        {operatorContainer.map((symbol) => (
          <button type="button" onClick={() => handleOperatorClick(symbol)}>
            {symbol}
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

const defaultValue = {
  firstNumber: 0,
  secondNumber: 0,
  displayedNumber: 0,
  operation: null,
};

render(defaultValue);
