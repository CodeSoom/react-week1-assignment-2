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

const handleClickNumber = (clicked_number, displayed_value) => {
  render(clicked_number, '');
}

const handleClickCalc = (displayed_value, operator) => {
  render(displayed_value)
}


function render(displayed_value, operator) {
  switch(operator) {
    case '+':
      break;
    case '-':
      break;
    case '*':
      break;
    case '/':
      break;
    case '=':
      break;
    default:
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayed_value}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i, displayed_value)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((op) => (
          <button type="button" onClick={() => handleClickCalc(displayed_value, op)}>
            {op}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0);
