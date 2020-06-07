/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const addingNumberDefaultValue = -1;
const calculation = {
  '+': (addedNumber, addingNumber) => addedNumber + addingNumber,
  '-': (addedNumber, addingNumber) => addedNumber - addingNumber,
  '*': (addedNumber, addingNumber) => addedNumber * addingNumber,
  '/': (addedNumber, addingNumber) => addedNumber / addingNumber,
};

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

function printNumber(addedNumber, addingNumber) {
  return addingNumber > -1 ? addingNumber : addedNumber;
}

function render({
  addedNumber = 0,
  addingNumber = addingNumberDefaultValue,
  mark = '',
} = {}) {
  function handleClickCalculationMark(value) {
    if (value === '=' || addingNumber > addingNumberDefaultValue) {
      render({
        addedNumber: calculation[mark](addedNumber, addingNumber),
        addingNumber: addingNumberDefaultValue,
        mark: value,
      });
    } else {
      render({
        addedNumber,
        addingNumber,
        mark: value,
      });
    }
  }

  function handleClickNumber(value) {
    function checkaddingNumberIfAddTail() {
      return addingNumber === 0 || addingNumber === addingNumberDefaultValue;
    }

    if (Object.prototype.hasOwnProperty.call(calculation, mark)) {
      render({
        addedNumber,
        addingNumber: checkaddingNumberIfAddTail() ? value : (addingNumber * 10) + value,
        mark,
      });
    } else {
      render({
        addedNumber: addedNumber === 0 || mark === '=' ? value : (addedNumber * 10) + value,
        addingNumber,
        mark: mark === '=' ? '' : mark,
      });
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{printNumber(addedNumber, addingNumber)}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((m) => (
          <button type="button" onClick={() => handleClickCalculationMark(m)}>
            {m}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
