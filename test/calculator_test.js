Feature('Calculator');

Scenario('계산기이 입력한 순서대로 계산하여 값을 출력합니다.', (I) => {
  I.amOnPage('/');

  ['9', '+', '4', '*', '3', '/', '2', '-', '9', '='].forEach((it) => I.click(it));

  I.see('10.5');
});
