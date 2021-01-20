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
const calculatorOriginState = {
  beforeNumber: 0,
  nextNumber: 0,
  operator: null,
  result: 0,
};

function render(calculatorState) {
  const {
    beforeNumber, nextNumber, operator, result,
  } = calculatorState;

  function handleClickNumber(buttonNumber) {
    return () => {
      if (operator) {
        if (result === 0) {
          const newState = {
            ...calculatorState,
            nextNumber: buttonNumber,
            result: buttonNumber,
          };
          return render(newState);
        }
        const calculationResult = Number(`${nextNumber}${buttonNumber}`);
        const newState = {
          ...calculatorState,
          nextNumber: calculationResult,
          result: calculationResult,
        };

        return render(newState);
      }
      if (result === 0) {
        const newState = {
          ...calculatorState,
          beforeNumber: buttonNumber,
          result: buttonNumber,
        };
        return render(newState);
      }

      const calculationResult = Number(`${beforeNumber}${buttonNumber}`);
      const newState = {
        ...calculatorState,
        beforeNumber: calculationResult,
        result: calculationResult,
      };
      return render(newState);
    };
  }

  function handleOperator(operatorType) {
    return () => {
      if (operator) {
        const calculationResult = operatorsMethods[operator](
          beforeNumber,
          nextNumber,
        );
        const newState = {
          beforeNumber: calculationResult,
          nextNumber: 0,
          operator: operatorType,
          result: calculationResult,
        };

        return render(newState);
      }
      const newState = { ...calculatorState, operator: operatorType };
      return render(newState);
    };
  }

  function handleEqual() {
    const calculationResult = operatorsMethods[operator](
      beforeNumber,
      nextNumber,
    );
    const newState = {
      beforeNumber: calculationResult,
      nextNumber: 0,
      operator: null,
      result: calculationResult,
    };

    return render(newState);
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <br />
      <div className="result-container">{result}</div>
      <br />
      <div className="number-container">
        {numbers.map((number) => (
          <button type="button" onClick={handleClickNumber(number)}>
            {number}
          </button>
        ))}
      </div>
      <br />
      <div className="operator-container">
        {Object.entries(operators).map(([key, value]) => (
          <button type="button" onClick={handleOperator(key)}>
            {value}
          </button>
        ))}
        <button type="button" onClick={handleEqual}>
          =
        </button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(calculatorOriginState);
