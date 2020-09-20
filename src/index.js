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

// 기본 값
const tempValue = {
  firstValue: 0, 
  secondValue: 0, 
  operator: 0,
  result: 0,
};
 
//연속된 숫자 처리
const seriatedValue = (preValue, value) => {
  return (preValue*10)+value;
} 

//피연산자의 위치 구분
const whichNumber = (recentNumber) => {
  if (tempValue.operator === 0) {
    tempValue.firstValue = seriatedValue(tempValue.firstValue, recentNumber);
    // tempValue.result = tempValue.firstValue;
    return tempValue.firstValue;
  }
  if (tempValue.operator != 0) {
    tempValue.secondValue  = seriatedValue(tempValue.secondValue, recentNumber);
    return tempValue.secondValue;
  }  
}

// '='를 누르기 전 후의 분기
const operateWork = (character) => {
  if (character === '='){
    tempValue.firstValue  = operateResult();
    tempValue.operator = 0;
    return tempValue.firstValue;
 };
 if (character !== '='&& tempValue.operator === 0){
  tempValue.operator = character;
  console.log(tempValue.operator);
 };
 if (character !== '=' && tempValue.operator != 0){
  tempValue.firstValue = operateResult();
  tempValue.secondValue = 0;
  tempValue.operator = character;
  return tempValue.firstValue;
 };
}

//연산자의 계산 작동
const operateResult = () => {
  const character = tempValue.operator;
  const operation = 
  {
    sum : tempValue.firstValue + tempValue.secondValue,
    subs : tempValue.firstValue - tempValue.secondValue,
    multi : tempValue.firstValue * tempValue.secondValue,
    divide : tempValue.firstValue / tempValue.secondValue,
  }
  if (character === '+'){return operation.sum}
  if (character === '-'){return operation.subs}
  if (character === '*'){return operation.multi}
  if (character === '/'){return operation.divide}
}

//
function render(value) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{value}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => {
            const temporary1 = whichNumber(i)
            render(temporary1);
            }}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+','-','*','/','='].map((j) => (
          <button type="button" onClick={() => {
            const temporary2 = operateWork(j);
            if(j === '='){
              render(temporary2);
            };
            if(j != '=' && tempValue.operator){
              render(temporary2);
            };
            }}>
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
