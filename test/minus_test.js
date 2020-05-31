Feature('Minus');

Scenario('"="를 클릭하면 결과가 출력됩니다.', (I) => {
  I.amOnPage('/');

  ['9', '-', '5', '='].forEach((it) => I.click(it));

  I.see(4);
});

Scenario('연속해서 빼면 중간에 계산된 값이 출력됩니다.', (I) => {
  I.amOnPage('/');

  ['9', '-', '9', '-', '9', '+'].forEach((it) => I.click(it));

  I.see('-9');
});
