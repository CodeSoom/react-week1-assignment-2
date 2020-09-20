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


let changeToInt;
let number1 = [];


function render(count) {


  function handleClickNumber(firstNumber) {
    number1 = [...number1, firstNumber];
    render(count = number1);
  }
  
  function makeNumber() {
    const changeToString = number1.join('');
    changeToInt = parseInt(changeToString, 10);
  }
  
  function Operator(Oper) {
    number1 = [...number1, Oper];
    render(count = number1);
    makeNumber();

    // count.pop('');
    const result = count.join('');
      render(count+5);
      number1 = [];

    if (Oper === '+') {
      plus();

    }
    else if (Oper === '-'){
      minus();
    }
    else if (Oper === '*'){
      multiply();
    }
    else if (Oper === '/'){
      division();
    }

  }

  function plus(){
    imsi = changeToInt
    console.log('plus',imsi)
  }

  function minus(){
    console.log('minus',imsi)
  }

  function multiply(){
    console.log('multiply',imsi)
  }

  function division(){
    console.log('division',imsi)
  }

  function result(){
    console.log('result',imsi)
  }

  const element = (
    <div>
      <div>
        <p> 간단 계산기 </p>
        <p>
          {' '}
          {count + setCount}
          {' '}
        </p>

        <p>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
            <button type="button" onClick={() => handleClickNumber(i)}>
              {i}
            </button>
          ))}
        </p>
      </div>

      <div>
        <p>
          {['+', '-', '*', '/', '='].map((i) => (
            <button type="button" onClick={() => Operator(i)}>
              {i}
            </button>
          ))}
        </p>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
