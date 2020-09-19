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

const operatorFunctions = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

class CalculatorState {
  constructor(cache = [0, -1, '']) {
    this.cache = cache;
  }

  get x() { return this.cache[0]; }

  set x(x) { this.cache[0] = x; }

  get y() { return this.cache[1]; }

  set y(y) { this.cache[1] = y; }

  get operator() { return this.cache[2]; }

  set operator(operator) { this.cache[2] = operator; }

  calculate() {
    if (this.operator !== '' && this.y > -1) {
      const result = operatorFunctions[this.operator](this.x, this.y);
      this.cache = [result, -1, ''];
    }
    return this;
  }

  clickNumberHandler(number) {
    if (this.operator) {
      if (this.y === -1) {
        this.y = number;
      } else {
        this.y = this.y * 10 + number;
      }
      return this;
    }
    this.x = this.x * 10 + number;
    return this;
  }

  clickOperatorHandler(operator) {
    if (this.operator && this.y > -1) {
      this.calculate();
    }
    this.operator = operator;
    return this;
  }
}

// return result and reset operator and second num
function render(state = new CalculatorState()) {
  const element = (
    <div id="calculator" className="calcurating">
      <p>간단 계산기 by EHOTO</p>
      <p>
        {
          !(state.operator && state.y !== -1) ? state.x : state.y
        }
      </p>
      <p>
        {Array.from({ length: 10 }, (_, i) => (i + 1) % 10).map((i) => (
          <button
            type="button"
            onClick={() => render(state.clickNumberHandler(i))}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {Object.keys(operatorFunctions).map((i) => (
          <button
            type="button"
            onClick={() => render(state.clickOperatorHandler(i))}
          >
            {i}
          </button>
        ))}
        <button
          type="button"
          onClick={() => render(state.calculate())}
        >
          =
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
