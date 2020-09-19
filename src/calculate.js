export const calculator = {
  addition: (number1, number2) => number1 + number2,
  subtraction: (number1, number2) => number1 - number2,
  division: (number1, number2) => number1 * number2,
  multiplication: (number1, number2) => number1 / number2,
};

export const initialState = {
  precedingValue: 0,
  succeedingValue: null,
  operator: null,
  addedNumber: 0,
  addedOperator: null,
  isReset: false,
};

const calculatePrecedingValue = (state) => {
  const {
    precedingValue,
    addedNumber,
    isReset,
  } = state;

  if (precedingValue === 0 || isReset) {
    return {
      ...state,
      precedingValue: addedNumber,
    };
  }

  return {
    ...state,
    precedingValue: +`${precedingValue}${addedNumber}`,
  };
};

const calculateSucceedingValue = (state) => {
  const {
    succeedingValue,
    addedNumber,
  } = state;

  if (succeedingValue) {
    return {
      ...state,
      succeedingValue: +`${succeedingValue}${addedNumber}`,
    };
  }

  return {
    ...state,
    succeedingValue: addedNumber,
  };
};

const calculateWithNumber = (state) => {
  const { operator } = state;

  if (operator) {
    return calculateSucceedingValue(state);
  }
  return calculatePrecedingValue(state);
};

const calculateWithOperator = (state) => {
  const {
    precedingValue,
    succeedingValue,
    operator,
    addedOperator,
  } = state;

  if (succeedingValue) {
    const operatorFunc = calculator[operator];
    return {
      ...state,
      precedingValue: operatorFunc(precedingValue, succeedingValue),
      succeedingValue: null,
      operator: addedOperator === 'equal' ? null : addedOperator,
      isReset: addedOperator === 'equal',
    };
  }

  return {
    ...state,
    operator: addedOperator,
  };
};

export { calculateWithNumber, calculateWithOperator };
