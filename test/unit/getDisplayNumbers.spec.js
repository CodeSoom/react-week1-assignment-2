import { getDisplayNumbers } from '../../src/getDisplayNumbers';

describe('getDisplayNumbers', () => {
  it('1~9, 0 의 순서대로 숫자가 나열된다', () => {
    const result = getDisplayNumbers();

    expect(result.length).toBe(10);
    expect(result[0]).toBe(1);
    expect(result[8]).toBe(9);
    expect(result[9]).toBe(0);
  });
});
