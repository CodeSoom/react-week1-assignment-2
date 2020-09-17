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

const 

const makeNumber = (value) => {
  console.log("숫자 만드는 곳");
  // 들어온 숫자에 무조건 10을 곱한 뒤 지금 들어온 숫자와 더하면 됨
  //이전의 값을 할당해놓을 곳이 필요함
  //value = value * 10 + value
  return value;
  
}

const calNumber = () => {
  console.log("연산해야할곳");
} 


function render(value) {
  //value가 연산자이냐 숫자이냐에 따라 1차 분기
  if(isNaN(value) != true){
    //숫자
    console.log('숫자');
    makeNumber(value);
  }else {
    //연산자
    console.log('연산자');
    calNumber();
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
