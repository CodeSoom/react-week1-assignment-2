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

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const operators = {
  add: '+',
  subtract: '-',
  multiply: '*',
  divide: '/',
};

const operatorsMethods = {
  add(beforeNumber, nextNumber) {
    return beforeNumber + nextNumber;
  },
  subtract(beforeNumber, nextNumber) {
    return beforeNumber - nextNumber;
  },
  multiply(beforeNumber, nextNumber) {
    return beforeNumber * nextNumber;
  },
  divide(beforeNumber, nextNumber) {
    return beforeNumber / nextNumber;
  },
};

function render(
  { beforeNumber, nextNumber, operator, result } = {
    beforeNumber: 0,
    nextNumber: 0,
    operator: null,
    result: 0,
  },
) {
  function setState(stateToChange) {
    return {
      beforeNumber,
      nextNumber,
      operator,
      result,
      ...stateToChange,
    };
  }

  function changeNumber(numberType, originalNumber, numberToChange) {
    if (result === 0) {
      return render(
        setState({ [numberType]: numberToChange, result: numberToChange }),
      );
    }

    return render(
      setState({
        [numberType]: Number(`${originalNumber}${numberToChange}`),
        result: Number(`${originalNumber}${numberToChange}`),
      }),
    );
  }

  function calculateNumber(operatorType) {
    const calculationResult = operatorsMethods[operator](
      beforeNumber,
      nextNumber,
    );
    return render(
      setState({
        beforeNumber: calculationResult,
        nextNumber: 0,
        operator: operatorType,
        result: calculationResult,
      }),
    );
  }

  function handleClickNumber(buttonNumber) {
    if (operator) {
      return changeNumber('nextNumber', nextNumber, buttonNumber);
    }

    return changeNumber('beforeNumber', beforeNumber, buttonNumber);
  }

  function handleOperator(operatorType) {
    if (operator) {
      return calculateNumber(operatorType);
    }
    return render(setState({ operator: operatorType }));
  }

  function handleEqualSignButton() {
    return calculateNumber(null);
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <br />
      <div className="result-container">{result}</div>
      <br />
      <div className="number-container">
        {numbers.map((number) => (
          <button type="button" onClick={() => handleClickNumber(number)}>
            {number}
          </button>
        ))}
      </div>
      <br />
      <div className="operator-container">
        {Object.entries(operators).map(([key, value]) => (
          <button type="button" onClick={() => handleOperator(key)}>
            {value}
          </button>
        ))}
        <button type="button" onClick={handleEqualSignButton}>
          =
        </button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
