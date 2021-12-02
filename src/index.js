/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
      return;
    }
    if (key.includes('-')) {
      element.setAttribute(key.toLowerCase(), value);
      return;
    }
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

/**
 * @param {Array<string | number>} [inputs=[]]
 * @return {number}
 */
function getLastIndex(inputs = []) {
  return inputs.length - 1;
}

/**
 * @param {Array<string | number>} [inputs=[]]
 * @return {number | string}
 */
function getLastInput(inputs = []) {
  return inputs[getLastIndex(inputs)];
}

/**
 * @param {Array<string | number>} [inputs=[]]
 * @return {string}
 */
function getDisplayContent(inputs = []) {
  // 처음에는 0
  // 마지막 누른 버튼이 숫자라면 마지막 입력한 숫자를 보여줌
  // 마지막 누른 버튼이 연산자라면 지금까지의 연산 결과를 보여줌
  if (inputs.length === 0) {
    return '0';
  }
  const lastInput = getLastInput(inputs);
  if (typeof lastInput === 'number') {
    return lastInput;
  }

  return `${inputs.reduce((acc, input, index) => {
    if (index === 0) {
      return input;
    }
    if (typeof input === 'number') {
      return acc + input;
    }
    if (input === '=') {
      return acc;
    }
    return acc;
  })}`;
}

/**
 * @param {{ inputs: Array<string | number> }} props
 */
function render({ inputs = [] } = { inputs: [] }) {
  function setState(newState) {
    render(newState);
  }

  function handleClickNumber(event) {
    const number = Number(event.target.closest('[data-key]').dataset.key);
    if (typeof getLastInput(inputs) === 'number') {
      const newInputs = [...inputs];
      newInputs[getLastIndex(inputs)] = getLastInput(inputs) * 10 + number;
      setState({ inputs: newInputs });
      return;
    }
    setState({ inputs: [...inputs, number] });
  }

  function handleClickOperatorExceptEquals(event) {
    const operator = event.target.closest('[data-key]').dataset.key;
    if (inputs.length === 0) {
      return;
    }
    const lastInput = getLastInput(inputs);
    if (typeof lastInput !== 'number' && lastInput !== '=') {
      const newInputs = [...inputs];
      newInputs[getLastIndex(inputs)] = operator;
      setState({ inputs: newInputs });
      return;
    }
    setState({ inputs: [...inputs, operator] });
  }

  function handleClickEquals() {
    if (inputs.length === 0) {
      return;
    }
    if (typeof getLastInput(inputs) !== 'number') {
      const newInputs = [...inputs];
      newInputs[getLastIndex(inputs)] = '=';
      setState({ inputs: newInputs });
      return;
    }
    setState({ inputs: [...inputs, '='] });
  }

  const element = (
    <section className="calculator">
      <h1>간단 계산기</h1>
      <div className="calculator__display">
        <p>{getDisplayContent(inputs)}</p>
      </div>
      <ul className="calculator__numbers">
        {[...Array(9).keys()].map((_, index) => {
          const number = (index + 1) % 10;
          return (
            <li data-key={number}>
              <button
                type="button"
                aria-label={number}
                onClick={handleClickNumber}
              >
                {number}
              </button>
            </li>
          );
        })}
      </ul>
      <ul className="calculator__operators">
        <li data-key="+">
          <button
            type="button"
            aria-label="plus"
            onClick={handleClickOperatorExceptEquals}
          >
            +
          </button>
        </li>
        <li data-key="-">
          <button
            type="button"
            aria-label="minus"
            onClick={handleClickOperatorExceptEquals}
          >
            -
          </button>
        </li>
        <li data-key="*">
          <button
            type="button"
            aria-label="multiply"
            onClick={handleClickOperatorExceptEquals}
          >
            *
          </button>
        </li>
        <li data-key="/">
          <button
            type="button"
            aria-label="divide"
            onClick={handleClickOperatorExceptEquals}
          >
            /
          </button>
        </li>
        <li data-key="=">
          <button type="button" aria-label="equals" onClick={handleClickEquals}>
            =
          </button>
        </li>
      </ul>
    </section>
  );

  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(element);
}

render();
