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

const OPERATION_ENUM = {
  '+': 'plus',
  '-': 'minus',
  '*': 'multiply',
  '/': 'divide',
  '=': 'equal',
};

const Button = (content, onClick) => (
  <button onClick={() => onClick()} type="button">
    {content}
  </button>
);

const ButtonGroup = (contentList, onClick) => (
  contentList.map((item) => Button(item, () => onClick(item)))
);

const Result = (result = 0, stack = []) => (
  <p id="result">{result}</p>
);

function render(child) {
  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(child);
}

const component = (stack = []) => {
  const inputNumber = (i) => {
    render(component());
  };

  const setOperation = (oper) => {
    render(component());
  };
  return (
    <div>
      <p>간단 계산기</p>
      {Result()}
      <div>
        <section>
          {ButtonGroup([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], inputNumber)}
        </section>
        <br />
        <section>
          {ButtonGroup(Object.keys(OPERATION_ENUM), setOperation)}
        </section>
      </div>
    </div>
  );
};

render(component());
