/**
 * @module htz-collapsibles/toggleCollapsible
 * @license MIT
 */

import elHasLayout from 'htz-collapsibles/elHasLayout';
import isCollapsible from 'htz-collapsibles/isCollapsible';
import { parseBpsState } from 'htz-parse-bps-state';

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
 * @param {String} bpsSelector - A selector for the element to which the active
 *    breakpoint data is attached. See
 *    [htz-parse-bps-state](https://github.com/haaretz/htz-parse-bps-state)
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
  expandedClass,
  bpsSelector
) {
  const isHidden = window.getComputedStyle(contentElem).visibility === 'hidden';
  const isCollapsed = !elHasLayout(contentElem) || isHidden || !contentElem;

  const collapsedClassRegex = new RegExp(`(${collapsedClass}[^'"\\s]*)`, 'gi');
  const expandedClassRegex = new RegExp(`(${expandedClass}[^'"\\s]*)`, 'gi');

  if (isCollapsed) {
    wrapper.classList.add(expandedClass);
    /* eslint-disable no-param-reassign */
    wrapper.className = wrapper.className.replace(collapsedClassRegex, '');
    /* eslint-enable no-param-reassign */
    toggleElem.setAttribute('aria-label', labelCollapse);
    toggleElem.setAttribute('aria-expanded', true);

    // move focus to expanded content elem
    contentElem.focus();
  }
  else {
    const bpsState = parseBpsState(bpsSelector);

    // Only collapse elements if collapsing is allowed at current breakpoint.
    if (isCollapsible(wrapper, bpsState)) {
      wrapper.classList.add(collapsedClass);
      /* eslint-disable no-param-reassign */
      wrapper.className = wrapper.className.replace(expandedClassRegex, '');
      /* eslint-enable no-param-reassign */
      toggleElem.setAttribute('aria-label', labelExpand);
      toggleElem.setAttribute('aria-expanded', false);
    }
  }

  return wrapper;
}
