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
function render({firstNum, secondNum, operator}) {
  // 버튼 클릭시 number에 추가
  function handleClickNumber(val){
      firstNum = val;
      secondNum = 0;
      // console.log({firstNum, secondNum, operator});
      render({firstNum, secondNum});
  }
  function operator(operator, prvNum = firstNum, nowNum = secondNum){ // 첫번째 숫자와, + 누른 후 두번째 숫자를 가져와야함
    // operator를 해주면 prvNum은 그대로 있고 nowNum을 새로 담아야함
    // console.log({operator, prvNum});
    console.log(operator + "|||" + prvNum + ":" + nowNum)
    //render({number:val + plus});
  }
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{firstNum}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) =>(
          <button type="button" onClick={() => handleClickNumber(i)}>{i}</button>
        ))}
      </p>
      <p>
        <button type="button" onClick={() => operator('+')}>+</button>
        <button type="button">-</button>
        <button type="button">*</button>
        <button type="button">/</button>
        <button type="button" onClick={() => operator('=')}>=</button>
      </p>
    </div>
  );
  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}
render({number:0});