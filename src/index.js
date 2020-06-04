/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars,  */
/* @jsx createElement */

const operators = [
  { sign: '+', fn: (l, r) => l + r },
  { sign: '-', fn: (l, r) => l - r },
  { sign: '*', fn: (l, r) => l * r },
  { sign: '/', fn: (l, r) => l / r },
];

const calculate = (left, right, operator) => {
  const [l, r, exec] = [Number(left), Number(right), operator.fn];
  return exec(l, r);
};

class State {
  constructor() {
    this.result = 0;
    this.left = '';
    this.right = '';
    this.operator = null;
  }

  setLeft(val) {
    this.left += val;
  }

  resetLeft() {
    this.left = '';
  }

  setRight(val) {
    this.right += val;
  }

  resetRight() {
    this.right = '';
  }

  setOperator(operator) {
    this.operator = operator;
  }

  resetOperator() {
    this.operator = null;
  }

  setResult(val) {
    this.result = val;
  }

  get display() {
    if (this.right) {
      return this.right;
    }
    if (!this.right && this.left) {
      return this.left;
    }
    return '0';
  }
}

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

function render(state) {
  const handleNumClick = (numStr) => {
    if (state.operator) {
      state.setRight(numStr);
      render(state);
      return;
    }
    state.setLeft(numStr);
    render(state);
  };

  const handleOpClick = (operator) => {
    if (state.left && state.right) {
      const calcResult = calculate(state.left, state.right, state.operator);
      state.setResult(calcResult);
      state.resetLeft();
      state.resetRight();
      state.setLeft(state.result);
      render(state);
    }
    state.setOperator(operator);
    render(state);
  };

  const handleResultClick = () => {
    const result = calculate(state.left, state.right, state.operator);
    if (state.right) {
      state.resetRight();
      state.resetLeft();
      state.resetOperator();
      state.setResult(result);
      state.setLeft(state.result);
    }
    render(state);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{state.display}</p>
      <div>
        {[...Array(10).keys()]
          .map((num) => (<button type="button" onClick={() => handleNumClick(num)}>{num}</button>))}
      </div>
      <div>
        {operators
          .map((operator) => (<button type="button" onClick={() => handleOpClick(operator)}>{operator.sign}</button>))}
        <button type="button" onClick={handleResultClick}>=</button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(new State());
