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

function render(
  propObj = {
    num1: '',
    num2: '',
    operator: '',
    result: 0,
    show: '0',
  },
) {
  const obj = propObj;
  const {
    num1, num2, operator, result, show,
  } = obj;
  const numArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const operatorArray = ['+', '-', '*', '/', '='];

  // 상태 셋팅 함수
  const setState = (state, value) => {
    obj[state] = value;
  };

  // 숫자 상태 초기화
  const setNumInit = () => {
    setState('num1', '');
    setState('num2', '');
  };

  // num1 상태 셋팅
  const setNum1 = (num) => {
    const value = num1 + num;
    setState('num1', value);
    setState('show', value);
  };

  // num2 상태 셋팅
  const setNum2 = (num) => {
    const value = num2 + num;
    setState('num2', value);
    setState('show', value);
  };

  // 숫자 버튼 클릭 이벤트
  const handleCalculate = (num) => {
    if (result || operator === '') {
      setNum1(num);
    } else {
      setNum2(num);
    }
    render(obj);
  };

  const handleOperator = (propOperator) => {
    if (operator) {
      // 연산 버튼을 한번이상 누른 로직
      if (result) {
        // 한번이상 진행한 계산일때 로직
        if (operator === '+') {
          const value = result + Math.floor(num1);
          setState('result', value);
        }
        if (operator === '-') {
          const value = result - Math.floor(num1);
          setState('result', value);
        }
        if (operator === '*') {
          const value = result * Math.floor(num1);
          setState('result', value);
        }
        if (operator === '/') {
          const value = result / Math.floor(num1);
          setState('result', value);
        }
        if (operator === '=') {
          setState('result', result);
        }
      } else {
        // 처음 계산할때
        if (operator === '+') {
          const value = Math.floor(num1) + Math.floor(num2);
          setState('result', value);
        }
        if (operator === '-') {
          const value = Math.floor(num1) - Math.floor(num2);
          setState('result', value);
        }
        if (operator === '*') {
          const value = Math.floor(num1) * Math.floor(num2);
          setState('result', value);
        }
        if (operator === '/') {
          const value = Math.floor(num1) / Math.floor(num2);
          setState('result', value);
        }
        if (operator === '=') {
          setState('result', result);
        }
      }
      // 여기 부분도 setState 함수로 상태변경을 시키려했는데 이 로직안에서 이미 한번 사용해서 그런가싶었는데 밑에 부분에서는 또 써도 에러가안나네요..ㅠ
      obj.show = obj.result;
      setNumInit();
    }
    setState('operator', propOperator);
    render(obj);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{show}</p>
      <div>
        {numArray.map((i, idx) => (
          <button
            onClick={() => {
              handleCalculate(i);
            }}
            key={i}
            type="button"
          >
            {i}
          </button>
        ))}
      </div>
      <div>
        {operatorArray.map((i, idx) => (
          <button
            onClick={() => {
              handleOperator(i);
            }}
            key={i}
            type="button"
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
