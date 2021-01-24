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

function calculate(firstNumber, secondNumber, operator) {
  const operatorFunction = {
    '+': (x, y) => x + y,
    // '-': (x, y) => x - y,
  };

  return operatorFunction[operator](firstNumber, secondNumber);
}

function render({ number, result, operator }) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const operators = ['+', '-', '*', '/'];

  function handleClickNumber(value) {
    render({
      number: number * 10 + value,
      result,
    });
  }

  function handleClickOperator(value) {
    console.log('number : ', number);
    console.log('result : ', result);
    console.log('operator : ', operator);

    // 123을 누른상태
    // + 를 눌렀을때 어떻게 동작해야할까? 이걸 정의하는 함수
    // a, b, +
    // a = 123
    // + 모름
    // b 모름

    // 내가만약 오퍼레이터를 눌렀을 때 일어나야하는일이 뭘까?
    // 1. 오퍼레이터를 저장한다
    // 2. 완성된 123을 나중에 써먹을수있게 저장한다.
    // 첫시작
    // 123 + >>>> 연산 안일어남
    // 123 + 34 - >>>> 연산이 일어나고, 연산의 결과는 157 - ?
    // result = 157
    // operator 도 계속 기억해야함
    // number = 10 * 1

    // handleClickOperator에서는 어떤일이 일어나야할까?
    // 지금 123 + 34 -
    // 1. operator 에는 -를 저장해놔야함. 왜냐하면, 나중에 -누른후에 어떤 값이 들어올거고 그거를 -연산을 해줘야하니까. 그리고 - 후에 나올값이 어떤것인ㄴ지모르니까 저장해야한다.
    // render ({ number, result, operator: '-' })
    // 2. 123 + 34를 연산해줘야한다.
    // result = 123 number = 34 현재 operator = '+'에는
    // render ({ number, result: 기존 result 기존 operator 기존 number > 연산을 한 값 , operator: '-' })
    // number =34 number의 역할은 임시저장소 역할
    // 3. number는 어떻게 되어야하지?
    // number를 초기화해준다.
    // render ({ number: 0, result: 기존 result 기존 operator 기존 number > 연산을 한 값 , operator: '-' })
    // 157 - (number: 9)

    // 계산은 실제로 언제되지?
    // 123 + 23
    // =을 눌렀을 때 연산됨
    // 123 + =  >>>> 123
    // 123 + 1 = >>> 124
    // 123 + 23 +

    render({
      number,
      result: calculate(number, result, operator),
      operator: value,
    });
  }

  const element = (
    <div>
      <p>{number}</p>
      <p>
        {numbers.map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {operators.map((i) => (
          <button type="button" onClick={() => handleClickOperator(i)}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  number: 0,
  result: 0,
  operator: '',
});
