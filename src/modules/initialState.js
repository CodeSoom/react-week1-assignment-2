import State from './state';

const initialState = new State(
  {
    holdingValue: '0',
    holdingOperator: '=',
    display: '0',
    previousInput: '0',
  },
);

export default initialState;
