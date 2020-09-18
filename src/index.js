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

const tempValue = {a: 'z', b: 'z', c:'z',d:'z'};

// const makeNumber = (value) => {
//   console.log("숫자 만드는 곳");
//   // 들어온 숫자에 무조건 10을 곱한 뒤 지금 들어온 숫자와 더하면 됨
//   //이전의 값을 할당해놓을 곳이 필요함
//   //value = value * 10 + value
//   preNumber.value = preNumber.value + value;
//   return value;
  
// }

const calculWays = (value1,value2,str) => {
  console.log("연산해야할곳");
  switch (str) 
  {
    //연산자 switch의 default는 숫자까리 더하는 값이 되어야함
    //switch로 연산자를 입력하고 그 다음에 숫자를 다시 입력 받아야 연산을 할 수 있음
    //연산자를 스트링으로 받으면 할당받고 그다음에 연산진행함수 안에서 계산을 해야 할듯하다.
    case '+':
      preValue.d  = sum(value1, value2);
      break;
    case '-':
      preValue.d = substract(value1, value2);
      break;
    case '*':
      preValue.d = multiply(value1, value2);
      break;
    case '/':
      preValue.d = divide(value1, value2);
      break;
    case '=':
      return preValue.d;
  }
} 

const isNumber = (preValue1, preValue2) => {
  if(isNaN(preValue2) != true){
    //숫자
    tempValue.a = (preValue1*10)+preValue2;
    
  }else {
    //연산자
    tempValue.c = preValue2;
    
  };
}

//사칙연산 함수 
const sum = (a, b) => {
  return a + b;
}

const substract = (a, b) => {
  return a - b;
}

const multiply = (a, b) => {
  return a * b;
}

const divide = (a, b) => {
  return a / b;
}
//숫자 다음 숫자를 누른 경우
const multiplyTen = (a, b) => {
  return (a * 10) + b;
}


//
function render(value) {
  if(tempValue.a != 'z') {
    tempValue.b = value;
    isNumber(tempValue.a, tempValue.b);
    value = tempValue.a;
  } else if (tempValue.c != 'z'){
    tempValue.b = value;
    calculWays(tempValue.a,tempValue.b,tempValue.c);
    render(tempValue.d);
  } else {
    tempValue.a = value;
  }
  


  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{value}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => render(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+','-','*','/','='].map((j) => (
          <button type="button" onClick={() => render(j)}>
            {j}
          </button>
        ))}
      </p>
    </div>
  );
  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}
render(0);
