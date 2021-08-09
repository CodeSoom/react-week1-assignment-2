/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

<<<<<<< HEAD
  children.flat().forEach((child) => {
=======
  children.flat().forEach(child => {
>>>>>>> i
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

<<<<<<< HEAD
=======
function handleClickNumber(value) {
  console.log(value);
  //
  render();
}

function handleClickFormula(value) {
  console.log(value);
  render();
}

// 숫자가 눌릴 때 마다 stack 에 저장하다가
// 수식이 눌릴 때 차례대로 꺼내고 계산해주면 되겟다.

>>>>>>> i
function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
<<<<<<< HEAD
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
=======
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>

      <p>
        {["+", "-", "*", "/"].map(i => (
          <button type="button" onClick={() => handleClickFormula(i)}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById("app").textContent = "";
  document.getElementById("app").appendChild(element);
>>>>>>> i
}

render();
