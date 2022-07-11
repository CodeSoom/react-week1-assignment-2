/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const createElement = (tagName, props, ...children) => {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;

      return;
    }

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

const records = [];
const operatorContainer = ['+', '-', '*', '/', '='];

const render = ({
  firstNumber, secondNumber, displayedNumber, operation, doOperate,
}) => {
  const addNumber = ({ isFirstNumber, number }) => {
    const renderArguments = {
      firstNumber,
      secondNumber,
      displayedNumber,
      operation,
      doOperate,
    };

    if (isFirstNumber) {
      renderArguments.firstNumber = parseInt(firstNumber + String(number), 10);
      renderArguments.displayedNumber = renderArguments.firstNumber;
      renderArguments.doOperate = true;

      return renderArguments;
    }

    renderArguments.secondNumber = parseInt(secondNumber + String(number), 10);
    renderArguments.displayedNumber = renderArguments.secondNumber;
    renderArguments.doOperate = true;

    return renderArguments;
  };

  const handleNumberClick = (number) => {
    const isFirstNumber = operation === null;
    const addedRenderArguments = addNumber({ isFirstNumber, number });

    render(addedRenderArguments);
  };

  const resultTable = ([first, second]) => {
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
      doOperate,
    };
    const result = resultTable(numbers)[previousOperator];

    if (currentOperator === '=') {
      renderArguments.firstNumber = 0;
      renderArguments.secondNumber = 0;
      renderArguments.displayedNumber = result;
      renderArguments.operation = null;
      renderArguments.doOperate = false;

      return renderArguments;
    }

    renderArguments.firstNumber = result;
    renderArguments.secondNumber = 0;
    renderArguments.displayedNumber = result;
    renderArguments.operation = currentOperator;
    renderArguments.doOperate = false;

    return renderArguments;
  };

  const handleOperatorClick = (currentOperator) => {
    const renderArguments = {
      firstNumber,
      secondNumber,
      displayedNumber,
      operation,
      doOperate,
    };

    if (renderArguments.operation === null && currentOperator === '=') {
      return;
    }

    if (renderArguments.doOperate === false && renderArguments.firstNumber && currentOperator !== '=') {
      renderArguments.operation = currentOperator;

      render(renderArguments);
    }

    if (renderArguments.doOperate === false) {
      return;
    }

    const doCalculationArgument = {
      numbers: [firstNumber, secondNumber],
      previousOperator: renderArguments.operation,
      currentOperator,
    };

    if (operation) {
      const calculationResult = doCalculation(doCalculationArgument);
      const currentResult = calculationResult.displayedNumber;
      records.push({
        firstNumber, operation, secondNumber, currentResult,
      });
      render(calculationResult);

      return;
    }

    renderArguments.operation = currentOperator;
    renderArguments.doOperate = false;
    render(renderArguments);
  };

  const monitorSecondNumber = document.getElementById('secondNumber');

  const element = (
    <div>
      <h1 id="title">간단 계산기</h1>
      <div className="monitor">
        <p>{firstNumber}</p>
        {operation ? <p>{operation}</p> : <p> </p>}
        {operation ? <p id="secondNumber">{secondNumber}</p> : <p> </p>}
        {monitorSecondNumber && operation
          ? <p>{` =  ${resultTable([firstNumber, secondNumber])[operation]}`}</p>
          : <p> </p>}
      </div>

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
      <section className="record">
        <h2 className="record-title">Records</h2>
        <ol>
          {records.map((record) => {
            const a = `${Object.entries(record).reduce((total, [key, value]) => {
              if (key === 'currentResult') {
                return `${total} = ${value}`;
              }

              return total + value;
            },
            '')}`;
            return (
              <li>{a}</li>
            );
          })}
        </ol>
      </section>
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
  doOperate: false,
};

render(defaultValue);
