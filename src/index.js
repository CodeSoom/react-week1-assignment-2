/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

class State {
  constructor() {
    this.result = 0;
    this.left = '';
    this.right = '';
    this.op = '';
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

  setOp(op) {
    this.op = op;
  }

  resetOp() {
    this.op = '';
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

const calculate = (left, right, op) => {
  const [l, r] = [Number(left), Number(right)];
  switch (op) {
    case '+':
      return l + r;
    case '-':
      return l - r;
    case '*':
      return l * r;
    case '/':
      return l / r;
    default:
      return 0;
  }
};

function render(state) {
  const handleNumClick = (numStr) => {
    if (['+', '-', '*', '/'].includes(state.op)) {
      state.setRight(numStr);
      render(state);
      return;
    }
    state.setLeft(numStr);
    render(state);
  };

  const handleOpClick = (opStr) => {
    if (state.left && state.right) {
      const calcResult = calculate(state.left, state.right, state.op);
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
    const result = calculate(state.left, state.right, state.op);
    if (state.right) {
      state.resetRight();
      state.resetLeft();
      state.setResult(result);
      state.setLeft(state.result);
      state.setOp('');
    }
    render(state);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{state.display}</p>
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (<button type="button" onClick={() => handleNumClick(num)}>{num}</button>))}
      </div>
      <div>
        {['+', '-', '*', '/'].map((op) => (<button type="button" onClick={() => handleOpClick(op)}>{op}</button>))}
        <button type="button" onClick={handleResultClick}>=</button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(new State());
