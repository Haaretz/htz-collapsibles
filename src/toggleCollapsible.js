/**
 * @module htz-collapsibles/toggleCollapsible
 * @license MIT
 */

import elHasLayout from 'htz-collapsibles/elHasLayout';

/**
 * Collapse or expand an element
 *
 * @param {HTMLElement} wrapper - The element wrapping
 * @param {HTMLElement} contentElem - The element containing the collapsible content.
 * @param {HTMLElement} toggleElem - The clickable element used toggling.
 * @param {String} labelExpand - The label used to describe the toggle button
 *    when the element is collapsed and it is used expanding.
 * @param {String} labelCollapse - The label used to describe the toggle button
 *    when the element is expanded and it is used collapsing.
 * @param {String} collapsedClass - The label to attach to the wrapper when it is collapsed.
 * @param {String} expandedClass - The label to attach to the wrapper when it is expanded.
 *
 * @return {HTMLElement} the wrapper. Allows chaining
 *
 * @access private
 */
export default function toggleCollapsible(
  wrapper,
  contentElem,
  toggleElem,
  labelExpand,
  labelCollapse,
  collapsedClass,
  expandedClass
) {
  const isCollapsed = !elHasLayout(contentElem);

  if (isCollapsed) {
    wrapper.classList.add(expandedClass);
    wrapper.classList.remove(collapsedClass);
    toggleElem.setAttribute('aria-label', `"${labelCollapse}"`);
    toggleElem.setAttribute('aria-expanded', true);
  }
  else {
    wrapper.classList.add(collapsedClass);
    wrapper.classList.remove(expandedClass);
    toggleElem.setAttribute('aria-label', `"${labelExpand}"`);
    toggleElem.setAttribute('aria-expanded', false);
  }

  return wrapper;
}
