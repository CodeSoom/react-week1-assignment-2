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

function render(count = '0', prev = '0', op, flag=false) {
  function showNum(i) {
    console.log(flag);
    if(flag === true) {
      count = ''
      flag = false;
    }
    if (count === '0') {
      count = '';
    }
    render(count + i.toString(), prev, op, flag)
  }

  function operation(i) {
    console.log('b', op)
    flag = true;

    if (op === undefined) {
      op = i
      render(count, count, op, flag);
      count = ''
    } else {
      
      if (op === i) {
        console.log("aa")
      } else {
      }
      if (op === "+") {
        prev = Number(count) + Number(prev)
      } else if (op === "-") {
        prev = Number(prev) - Number(count)
      } else if (op === "*") {
        prev = Number(prev) * Number(count)
      } else if (op === "/") {
        prev = Number(prev) / Number(count)
      } else if (op === '=') {
        render(prev, prev, op, flag)
        count = '0';
        prev = '';
        op = undefined
      }

      render(prev, prev, i, flag);
      count = ''
      console.log(op, count, "a")
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{count}</p>
      <div>
        <p>
          {
            [1,2,3,4,5,6,7,8,9,0].map((i) => (
            <button type="button" onClick={() => showNum(i)}>
              {i}
            </button>))
          }
        </p>
     </div>
     <div>
       <p>
         {
           ["+", "-", "*", "/", "="].map((i) => (
             <button type="button" onClick={() => operation(i)}>
               {i}
             </button>
           ))
         }
       </p>
     </div>
    </div>

  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();

// num op num op num op 