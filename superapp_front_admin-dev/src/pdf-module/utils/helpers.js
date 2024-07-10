/**
 * Generates a unique ID.
 *
 * @returns {function} A function that generates a unique ID.
 */
export function ggID() {
  let id = 0;
  return function genId() {
    return id++;
  };
}

/**
 * Calculates the new position of an element being dragged.
 *
 * @param {number} x - The current x-coordinate of the element.
 * @param {number} y - The current y-coordinate of the element.
 * @param {number} dragX - The amount of horizontal drag.
 * @param {number} dragY - The amount of vertical drag.
 * @param {number} width - The width of the element.
 * @param {number} height - The height of the element.
 * @param {number} pageWidth - The width of the page.
 * @param {number} pageHeight - The height of the page.
 * @returns {Object} An object containing the new top and left positions of the element.
 */
export const getMovePosition = (
  x,
  y,
  dragX,
  dragY,
  width,
  height,
  pageWidth,
  pageHeight
) => {
  const newPositionTop = y + dragY;
  const newPositionLeft = x + dragX;
  const newPositionRight = newPositionLeft + width;
  const newPositionBottom = newPositionTop + height;

  const top =
    newPositionTop < 0
      ? 0
      : newPositionBottom > pageHeight
      ? pageHeight - height
      : newPositionTop;
  const left =
    newPositionLeft < 0
      ? 0
      : newPositionRight > pageWidth
      ? pageWidth - width
      : newPositionLeft;

  return {
    top,
    left,
  };
};

/**
 * Normalizes a value from the range [0, 255] to the range [0, 1].
 *
 * @param {number} value - The value to normalize.
 * @returns {number} The normalized value.
 */
export const normalize = (value) => parseFloat((value / 255).toFixed(1));
