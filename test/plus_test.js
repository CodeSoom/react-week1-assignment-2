Feature('Plus');

Scenario('숫자를 눌렀을 때 누른 숫자가 표시됩니다.', (I) => {
  I.amOnPage('/');

  I.click('4');
  I.click('3');

  I.see('43');
});

Scenario('연산자를 입력한 후 다시 숫자를 입력하면 새로 입력한 숫자가 표시됩니다.', (I) => {
  I.amOnPage('/');

  ['4', '3', '+', '2', '1'].forEach((it) => I.click(it));

  I.dontSee('43');
  I.see('21');
});

Scenario('"="를 클릭하면 결과가 출력됩니다.', (I) => {
  I.amOnPage('/');

  ['5', '+', '9', '='].forEach((it) => I.click(it));

  I.see(5 + 9);
});

Scenario('연속해서 더하면 중간에 계산된 값이 출력됩니다.', (I) => {
  I.amOnPage('/');

  ['5', '+', '9', '+', '9', '+'].forEach((it) => I.click(it));

  I.see('23');
});
