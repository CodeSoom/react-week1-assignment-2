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

function render(ctxData) {
  const calculator = (accData) => {
    const len = accData.length;
    let result = accData[0];
    let op;
    for (let i = 1; i < len; i += 1) {
      if (i % 2 === 1) {
        op = accData[i];
      } else {
        if (op === '+') result += accData[i];
        if (op === '-') result -= accData[i];
        if (op === '*') result *= accData[i];
        if (op === '/') result /= accData[i];
      }
    }
    return result;
  };

  const updateShowData = (number) => {
    ctxData.showData.pop();
    ctxData.showData.push(number);
  };

  const onClickOperand = (clickedNumber) => {
    ctxData.opData.push(clickedNumber);
    updateShowData(Number(ctxData.opData.join('')));
    render(ctxData);
  };

  const onClickOperator = (operator) => {
    const opData = Number(ctxData.opData.join(''));
    while (ctxData.opData.length) {
      ctxData.opData.pop();
    }
    ctxData.accData.push(opData);
    ctxData.accData.push(operator);

    const result = calculator(ctxData.accData);
    updateShowData(result);
    render(ctxData);
  };

  const element = (
    <div id="main">
      <p>간단 계산기</p>
      <p id="show">{ctxData.showData}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => <button type="button" onClick={() => onClickOperand(n)}>{n}</button>)}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((o) => <button type="button" onClick={() => onClickOperator(o)}>{o}</button>)}
      </p>
    </div>
  );


  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  showData: [],
  accData: [],
  opData: [],
});
