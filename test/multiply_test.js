Feature('Multiply');

Scenario('"="를 클릭하면 결과가 출력됩니다.', (I) => {
  I.amOnPage('/');

  ['9', '*', '5', '='].forEach((it) => I.click(it));

  I.see(45);
});

Scenario('연속해서 곱하면 중간에 계산된 값이 출력됩니다.', (I) => {
  I.amOnPage('/');

  ['3', '*', '3', '*', '3', '*'].forEach((it) => I.click(it));

  I.see(27);
});
