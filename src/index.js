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

function render({cur, prev, operatorClicked, operator, answerClicked}) {
  function clickNumber(value) {
    if(answerClicked) {
      cur = value
      answerClicked = false
    }
    else if(operatorClicked) {
      cur = value
      operatorClicked = false
    } 
    else if(cur != 0) {
      cur = cur * 10 + value
    }
    else{
      cur = value
    }
    render({ cur, prev, operatorClicked, operator, answerClicked})
  }

  function clickOperator(value) {
    answerClicked = false
    if(prev && cur && operator) cur = operator(prev, cur)

    if(value === '+') operator = (a, b) => a + b;
    else if(value === '-') operator = (a, b) => a - b;
    else if(value === '*') operator = (a, b) => a * b;
    else operator = (a, b) => a / b;

    prev = cur
    operatorClicked = true

    render({ cur, prev, operatorClicked, operator, answerClicked})
  }

  function clickAnswer() {
    if(!operator) return
    
    answerClicked = true
    cur = operator(prev, cur)
    prev = null
    render({ cur, prev, operatorClicked, operator, answerClicked})
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      {cur}
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => clickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
          <button onClick={() => clickOperator('+')}>+</button>
          <button onClick={() => clickOperator('-')}>-</button>
          <button onClick={() => clickOperator('*')}>*</button>
          <button onClick={() => clickOperator('/')}>/</button>
          <button onClick={clickAnswer}>=</button>
      </p>      
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({cur: 0, prev: null, operatorClicked: false, operator: null, answerClicked: false});
