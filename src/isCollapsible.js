/**
 * @module htz-collapsibles/isCollapsible
 * @license MIT
 */

import { evaluateBp } from 'htz-parse-bps-state';

/**
  * Evaluate if an element is collapsible at the current breakpoint
  * based on values specified in the `data-collapsible-bps` attribute.
  *
  * @param {HTMLElement} elem - The element to evalute.
  * @param {Object} activeBps - A JSON-like object extracted from CSS,
  *    declaring if a given breakpoint is currently active or inactive.
  *
  * @return {Bollean} - Indicates if an element is currently collapsible.
  *
  * @access private
  */
export default function isCollapsible(elem, activeBps) {
  const bps = elem.getAttribute('data-collapsible-bps');

  if (bps) {
    bp = bps.split(',');

    if (bps.length > 1) {
      return bps.reduce((prevBp, currentBp) =>
        prevBp === true || // Short circuit if prev bp is already true.
        evaluateBp(prevBp.trim ? prevBp.trim() : prevBp, activeBps) ||
        evaluateBp(currentBp.trim ? currentBp.trim() : currentBp, activeBps
      ));
    }
    else if (bp.length === 1) return evaluateBp(bps[0].trim ? bps[0].trim() : bps[0], activeBps);
  }

  return false;
}
