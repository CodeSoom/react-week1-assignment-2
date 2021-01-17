Feature('Equals');

Scenario('"="를 클릭 후 숫자를 누르면 새로운 계산이 시작됩니다.', (I) => {
  I.amOnPage('/');

  ['9', '-', '5', '=', '1', '4', '*'].forEach((it) => I.click(it));

  I.see('14');
});
