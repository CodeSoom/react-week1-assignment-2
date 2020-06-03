/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars,  */
/* @jsx createElement */

const operators = {
  ADD: '+',
  SUB: '-',
  MULT: '*',
  DIV: '/',
};

const operationsMap = {
  [operators.ADD]: (l, r) => l + r,
  [operators.SUB]: (l, r) => l - r,
  [operators.MULT]: (l, r) => l * r,
  [operators.DIV]: (l, r) => l / r,
};

const calculate = (left, right, operator) => {
  const [l, r] = [Number(left), Number(right)];
  const exec = operationsMap[operator];
  return exec(l, r);
};

class State {
  constructor() {
    this.result = 0;
    this.left = '';
    this.right = '';
    this.operator = '';
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

  setOp(operator) {
    this.operator = operator;
  }

  resetOp() {
    this.operator = '';
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

  const handleOpClick = (opStr) => {
    if (state.left && state.right) {
      const calcResult = calculate(state.left, state.right, state.operator);
      state.setResult(calcResult);
      state.resetLeft();
      state.resetRight();
      state.setLeft(state.result);
      render(state);
    }
    state.setOp(opStr);
    render(state);
  };

  const handleResultClick = () => {
    const result = calculate(state.left, state.right, state.operator);
    if (state.right) {
      state.resetRight();
      state.resetLeft();
      state.resetOp();
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
        {Object.values(operators)
          .map((operator) => (<button type="button" onClick={() => handleOpClick(operator)}>{operator}</button>))}
        <button type="button" onClick={handleResultClick}>=</button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(new State());
