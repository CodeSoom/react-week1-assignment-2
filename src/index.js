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

function calcNumberHandler(currentOperator, forwardNum, backNum) {
  let result;
  switch (currentOperator) {
  case '+':
    result = forwardNum + backNum;
    break;
  case '-':
    result = forwardNum - backNum;
    break;

  case '*':
    result = forwardNum * backNum;
    break;

  case '/':
    result = forwardNum / backNum;
    break;
  default:
  }
  return result;
}

function render({
  count, operator, holder, reset,
}) {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const operators = ['+', '-', '*', '/', '='];

  function checkNumberHandler(clickedNumber) {
    if (!operator) {
      const newCount = count === '0' ? '' : count;
      render({ count: newCount + clickedNumber, holder, reset: true });
    } else {
      const newCount = reset ? '' : count;
      render({
        count: newCount + clickedNumber,
        operator,
        holder,
        reset: false,
      });
    }
  }

  function calculateNumberHandler(clickedOperator) {
    if (!operator) {
      render({
        count, operator: clickedOperator, holder: count, reset: true,
      });
    } else if (clickedOperator === '=') {
      const didCalcNumber = calcNumberHandler(
        operator,
        Number(holder),
        Number(count),
      );

      render({
        count: didCalcNumber,
        operator: null,
        holder: null,
      });
    } else {
      const didCalcNumber = calcNumberHandler(
        operator,
        Number(holder),
        Number(count),
      );
      render({
        count: didCalcNumber,
        operator: clickedOperator,
        holder: didCalcNumber,
        reset: true,
      });
    }
  }

  const element = (
    <div id="wrapper">
      <p>간단 계산기</p>

      <h1>{count}</h1>

      <ul id="list">
        {numbers.map((number) => (
          <li>
            <button type="button" onClick={() => checkNumberHandler(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>

      <ul id="list">
        {operators.map((oper) => (
          <li>
            <button
              type="button"
              onClick={() => calculateNumberHandler(oper)}
            >
              {oper}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  count: '0', operator: undefined, holder: undefined, reset: false,
});
