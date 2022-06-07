/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* eslint-disable linebreak-style, no-console, quotes */

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

// operators
const plus = '+';
const minus = '-';
const multiple = '*';
const divide = '/';
const equal = '=';

function handleClickNumber(number, originvalue, originOperator, operand) {
  if(!originOperator) {
    const res = !!originvalue ? originvalue.toString() + number.toString() : number.toString();
    render(parseFloat(res), originOperator, operand);
  } else {
    const res = !!operand ? operand.toString() + number.toString() : number.toString();
    render(originvalue, originOperator, parseFloat(res));
  }
}

function handleClickOperator(operator, originvalue, originOperator, operand) {
  if(!originOperator) {
    // 사칙연산 없이 등호를 입력한 경우, 모든 연산 초기화.
    if(operator === equal) {
      render(0, null, 0);
      return;  
    }
    render(originvalue, operator, operand)
  } else {  
    // 연속해서 숫자와 연산자를 입력하면 중간에 계산 결과를 originValue에 넣고, 나머지 연산자와 피연산자는 초기화.
    // 등호가 입력된 경우, 기입력된 연산자로 연산.
    const op = operator === equal ? originOperator : operator;
    if (op === plus) {
      const nextOriginValue = originvalue + operand;
      render(nextOriginValue, null, 0);
    } else if (op === minus) {
      const nextOriginValue = originvalue - operand;
      render(nextOriginValue, null, 0);
    } else if (op === multiple) {
      const nextOriginValue = originvalue * operand;
      render(nextOriginValue, null, 0);
    } else if (op === divide) {
      if(operand === 0) {
        alert('0으로 나눌 수 없습니다!');
        return;
      }
      const nextOriginValue = originvalue / operand;
      render(nextOriginValue, null, 0);
    }
  }
}

function render(originvalue, originOperator, operand) {
  const numberPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = [plus, minus, multiple, divide, equal];
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{!!operand ? operand : originvalue}</p>
      <div>
        {
          numberPad.map((number) => <button type="button" onClick={() => handleClickNumber(number, originvalue, originOperator, operand)}>{number}</button>)
        }
      </div>
      <div>
        {
          operators.map((operator) => <button type="button" onClick={() => handleClickOperator(operator, originvalue, originOperator, operand)}>{operator}</button>)
        }
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0, null, 0);