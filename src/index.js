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

const calculator = () => {
  
}

const plus = () => {

}

const minus = () => {

}

const divide = () => {

}

const multiply = () => {

}

function render() {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];

  const element = (
    <div>
      <p>간단 계산기</p>
      <div>0</div>
      <p>
        {
          nums.map((num) => (
            <button type="button" onClick={() => ( calculator(num) )}>
              {num}
            </button>
          ))
        }
      </p>
      <p>
        {
          operators.map((operator) => (
            <button type="button" onClick={() => ( calculator() )}>
              {operator}
            </button>
          ))
        }
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
