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

function render({
  count = 0, savedValue = 0, currentValue = 0, savedOperator = '', accumulator = null,
}) {
  function handleNumberClick(obj) {
    const {
      count: cnt, number, savedOperator: operator, savedValue: savedVal, currentValue: currVal,
    } = obj;
    const currentVal = (currVal * 10) + number;
    render({
      count: currentVal, savedValue, currentValue: currentVal, savedOperator, accumulator,
    });
  }
  function calculation(obj) {
    const {
      operator: oper, savedValue: savedVal, currentValue: currentVal, accumulator: accumul,
    } = obj;
    const operator = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
    };
    return (accumul === null)
      ? operator[oper](savedVal, currentVal)
      : operator[oper](accumul, currentVal);
  }
  function arithmeticOperatorClick(obj) {
    const {
      operator: oper,
      savedValue: savedVal,
      currentValue: currVal,
      savedOperator: savedOper,
      accumulator: accumul,
    } = obj;
    if (savedOper !== '') {
      const result = calculation({
        operator: savedOper, savedValue: savedVal, currentValue: currVal, accumulator: accumul,
      });
      render({
        count: result,
        savedValue: savedVal,
        currentValue: 0,
        savedOperator: oper,
        accumulator: result,
      });
    } else {
      render({
        count: currVal,
        savedValue: currVal,
        currentValue: 0,
        savedOperator: oper,
        accumulator: accumul,
      });
    }
  }
  function equalOperatorClick(obj) {
    const {
      operator: oper,
      savedValue: savedVal,
      currentValue: currVal,
      savedOperator: savedOper,
      accumulator: accumul,
    } = obj;
    const result = calculation({
      operator: savedOper, savedValue: savedVal, currentValue: currVal, accumulator: accumul,
    });
    render({
      count: result, savedValue: 0, currentValue: 0, savedOperator: '', accumulator: result,
    });
  }
  function handleOperatorClick(obj) {
    if (obj.operator === '=') {
      equalOperatorClick(obj);
    } else {
      arithmeticOperatorClick(obj);
    }
  }
  const element = (
    <div>
      <p>간단 계산기</p>

      <p>{count}</p>
      <p>
        {[...Array(10)].map((_, number) => (
          <button
            type="button"
            onClick={() => handleNumberClick({
              count, number, savedOperator, savedValue, currentValue,
            })}
          >
            {number}
          </button>
        ))}
      </p>
      {['+', '-', '*', '/', '='].map((operator) => (
        <button
          type="button"
          onClick={() => handleOperatorClick({
            operator, savedValue, currentValue, savedOperator, accumulator,
          })}
        >
          {operator}
        </button>
      ))}
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ count: 0 });
