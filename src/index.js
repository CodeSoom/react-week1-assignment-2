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

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ['+', '-', '*', '/', '='];

let picks = {
  number: 0,
  operator: '',
  lastPick: '',
  sequence: [],
};

function render(value = 0) {
  const calculation = () => {
    switch (picks.operator) {
    case '+':
      return (picks.number + value);
    case '-':
      return (picks.number - value);
    case '*':
      return (picks.number * value);
    case '/':
      return (picks.number / value);
    default:
      return null;
    }
  };

  const numberClick = (num) => {
    let changeNumber = num;

    picks = { ...picks, sequence: picks.sequence.concat(changeNumber), lastPick: 'number' };

    if (picks.lastPick === 'number') {
      changeNumber = '';
      picks.sequence?.forEach((n) => {
        changeNumber += n.toString();
      });
      changeNumber = Number(changeNumber);
    }

    render(changeNumber);
  };

  const operatorClick = (opera) => {
    picks = { ...picks, lastPick: 'operator', sequence: [] };
    if (opera === '=' && picks.operator !== opera) {
      const result = calculation();
      picks = { ...picks, number: 0, operator: opera };
      render(result);
    } else if (picks.operator !== '') {
      const result = calculation();
      picks = { ...picks, operator: opera, number: result };
      render(result);
    } else {
      picks = { ...picks, operator: opera, number: value };
    }
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{value}</p>
      <p>
        {numbers?.map((num) => (
          <button type="button" onClick={() => numberClick(num)}>
            {num}
          </button>
        ))}
      </p>
      <p>
        {operators?.map((opera) => (
          <button type="button" onClick={() => operatorClick(opera)}>
            {opera}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
