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

const initialState = {
  precedingValue: 0,
  succeedingValue: null,
  operator: null,
  isReset: false,
};

function render(state) {
  const {
    precedingValue,
    succeedingValue,
    operatorType,
    isReset,
  } = state;
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = [
    { operator: '+', type: 'addition' },
    { operator: '-', type: 'subtraction' },
    { operator: '*', type: 'division' },
    { operator: '/', type: 'multiplication' },
    { operator: '=', type: 'equal' },
  ];
  const calculator = {
    addition: (number1, number2) => number1 + number2,
    subtraction: (number1, number2) => number1 - number2,
    division: (number1, number2) => number1 * number2,
    multiplication: (number1, number2) => number1 / number2,
  };

  const calculatePrecedingValue = (number) => {
    if (precedingValue === 0 || isReset) {
      return {
        ...state,
        precedingValue: number,
      };
    }

    return {
      ...state,
      precedingValue: +`${precedingValue}${number}`,
    };
  };

  const calculateSucceedingValue = (number) => {
    if (succeedingValue) {
      return {
        ...state,
        succeedingValue: +`${succeedingValue}${number}`,
      };
    }

    return {
      ...state,
      succeedingValue: number,
    };
  };

  const calculateNumber = (number) => {
    if (operatorType) {
      return calculateSucceedingValue(number);
    }
    return calculatePrecedingValue(number);
  };

  const calculateOperator = (type) => {
    if (succeedingValue) {
      const operatorFunc = calculator[operatorType];
      return {
        ...state,
        precedingValue: operatorFunc(precedingValue, succeedingValue),
        succeedingValue: null,
        operatorType: type === 'equal' ? null : type,
        isReset: type === 'equal',
      };
    }

    return {
      ...state,
      operatorType: type,
    };
  };

  const handleNumberClick = (number) => {
    render(calculateNumber(number));
  };

  const handleOperatorClick = (operator) => {
    render(calculateOperator(operator));
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{succeedingValue || precedingValue}</p>
      <p>
        {numbers.map((number) => (
          <button
            type="button"
            onClick={() => handleNumberClick(number)}
          >
            {number}
          </button>
        ))}
      </p>
      <p>
        {operators.map(({ operator, type }) => (
          <button
            type="button"
            onClick={() => handleOperatorClick(type)}
          >
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
