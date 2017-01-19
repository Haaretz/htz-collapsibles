/**
 * @module htz-collapsibles/evaluate
 * @license MIT
 */
import { parseBpsState } from 'htz-parse-bps-state';
import isCollapsible from 'htz-collapsibles/isCollapsible';
import { isCollapsed, expand, collapse } from 'htz-collapsibles/changeState';


/**
 * Evaluate a collapsible element and set its
 * state to the correct one in current conditions.
 *
 * @param {HTMLElement} element - An element to evaluate.
 * @param {HTMLElement} contentElem - The element containing the collapsible content.
 * @param {HTMLElement} toggleElem - The clickable element used for toggling.
 * @param {String} labelExpand - The label used to describe the toggle button
 *    when the element is collapsed and the button is used for expanding.
 * @param {String} labelCollapse - The label used to describe the toggle button
 *    when the element is expanded and the button is used for collapsing.
 * @param {String} collapsedClass - The label to attach to the wrapper when it is collapsed.
 * @param {String} expandedClass - The label to attach to the wrapper when it is expanded.
 * @param {String} bpsSelector - A selector for the element to which the active
 *    breakpoint data is attached. See
 *    [htz-parse-bps-state](https://github.com/haaretz/htz-parse-bps-state)
 * @param {Boolean} [isExpanded] - Indicates if the collapsible is collapsed (`false`) or
 *   expanded (true`).
 *
 * @return {Boolean} - The evaluated element's state - `false` if collapsed,
 *     `true` if expanded.
 */
export default function evaluate(
  element,
  contentElem,
  toggleElem,
  labelExpand,
  labelCollapse,
  collapsedClass,
  expandedClass,
  bpsSelector,
  isExpanded
) {
  const bpsState = parseBpsState(bpsSelector);
  const collapsedClassRegex = new RegExp(`(${collapsedClass}[^'"\\s]*)`, 'gi');

  const elIsCollapsible = isCollapsible(element, bpsState);

  if (elIsCollapsible) {
    if (!contentElem.getAttribute('tabindex')) {
      // Make content element programmatically focusable,
      // but keep it outside the tab cycle
      contentElem.setAttribute('tabindex', '-1');
    }

    if (isExpanded === undefined) {
      if (isCollapsed(contentElem)) {
        toggleElem.setAttribute('aria-label', labelCollapse);
        toggleElem.setAttribute('aria-expanded', true);

        return undefined;
      }

      toggleElem.setAttribute('aria-label', labelExpand);
      toggleElem.setAttribute('aria-expanded', false);

      return undefined;
    }

    return isExpanded ?
      expand(
        element,
        contentElem,
        toggleElem,
        labelExpand,
        labelCollapse,
        collapsedClass,
        expandedClass,
        bpsSelector
      ) :
      collapse(
        element,
        contentElem,
        toggleElem,
        labelExpand,
        labelCollapse,
        collapsedClass,
        expandedClass,
        bpsSelector
      );
  }

  toggleElem.removeAttribute('aria-controls');
  toggleElem.removeAttribute('aria-label');
  toggleElem.removeAttribute('aria-expanded');
  element.classList.add(expandedClass);
  /* eslint-disable no-param-reassign */
  element.className = element.className.replace(collapsedClassRegex, '');
  /* eslint-enable no-param-reassign */

  return undefined;
}
