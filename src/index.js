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

const calculate = {
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

  get y() { return this.cache[1]; }

  get operator() { return this.cache[2]; }

  calculate() {
    if (this.cache[2] !== '') {
      const result = calculate[this.cache[2]](this.cache[0], this.cache[1]);
      this.cache = [result, -1, ''];
    }
    return this;
  }

  clickNumberHandler(number) {
    if (this.cache[2]) {
      if (this.cache[1] === -1) {
        this.cache[1] = 0;
      } else {
        this.cache[1] = this.cache[1] * 10 + number;
      }
      return this;
    }
    this.cache[0] = this.cache[0] * 10 + number;
    return this;
  }

  clickOperatorHandler(operator) {
    this.cache[2] = operator;
    return this;
  }
}

// return result and reset operator and second num
function render(state = new CalculatorState()) {
  console.log(state);
  const element = (
    <div id="calculator" className="calcurating">
      <p>간단 계산기 by EHOTO</p>
      <p>
        {
          !(state.operator && state.y !== -1) ? state.x : state.y
        }
      </p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button
            type="button"
            onClick={() => render(state.clickNumberHandler(i))}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {Object.keys(calculate).map((i) => (
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
