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

function render() {
  const handleClickNumber = (e) => {
    const number = e.target.textContent;
    console.log(typeof e.target.textContent);
  };
  const handleClickOperator = (e) => {
    const operator = e.target.textContent;
    console.log(e.target.textContent);
  };
  const element = (
    <div>
      <p>간단 계산기</p>
      <span>0</span>
      <div className="button_number_collection">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button type="button" onClick={(e) => handleClickNumber(e)}>
            {number}
          </button>
        ))}
      </div>
      <div className="button_operator_collection">
        {["+", "-", "*", "/", "="].map((operator) => (
          <button type="button" onClick={(e) => handleClickOperator(e)}>
            {operator}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById("app").textContent = "";
  document.getElementById("app").appendChild(element);
}

render();
