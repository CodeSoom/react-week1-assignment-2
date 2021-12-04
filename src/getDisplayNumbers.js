/**
 * @returns {number[]}
 */
// eslint-disable-next-line import/prefer-default-export
export function getDisplayNumbers() {
  return [...(Array.from({ length: 9 }, (_, i) => i + 1)), 0];
}
