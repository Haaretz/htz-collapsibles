/**
 * @module htz-collapsibles/elHasLayout
 * @license MIT
 */

/**
 * Check if an element has layout
 *
 * @param {HTMLElement} element - An element to evaluate the layout of
 *
 * @return {Boolean} Indicates if an element has layout
 *
 * @access private
 */
export default function elHasLayout(element) {
  return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}

