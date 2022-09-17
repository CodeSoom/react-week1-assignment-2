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
const x = [0, 0];

function render(result = [0, 0]) {
  function handleClickNumber(data, i) {
    let temp;
    if (data[1] === 0) {
      temp = i;
    } else {
      temp = `${data[1]}${i}`;
    }
    const aaa = [0, parseInt(temp, 10)];
    render(aaa);
  }
  function handleClickOperation(data, operation) {
    const aaa = data;
    // eslint-disable-next-line prefer-destructuring
    aaa[0] = aaa[1];
    switch (operation) {
    case '+':
      temp = x[0] + x[1];
      render(temp);dfdf
      x[0] = temp;
      x[1] = 0;
      break;adsfasf
      // case '-':
      //   break;
      // case '*':
      //   break;
      // case '/':
      //    break;
      //  case '=':
      //    break;
    default:
      break;
    }
    // render(temp1);
  }
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{result[1]}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(result, i)}>{i}</button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((oper) => (
          <button type="button" onClick={() => handleClickOperation(result, oper)}>{oper}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
