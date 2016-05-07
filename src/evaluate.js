/**
 * @module htz-collapsibles/evaluate
 * @license MIT
 */
import { parseBpsState } from 'htz-parse-bps-state';
import elHasLayout from 'htz-collapsibles/elHasLayout';
import toggleCollapsible from 'htz-collapsibles/toggleCollapsible';
import isCollapsible from 'htz-collapsibles/isCollapsible';


/**
 * Evaluate an array (not a collection!) of collapsible elements
 * and set their state to the correct one in current conditions.
 *
 * @param {HTMLElement[]} elements - A array of collapsible elements to evaluate.
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
 * @return {HTMLElement[]} - An array of the evaluated elements.
 *
 * @access private
 */
export default function evaluate(
  elements,
  labelExpand,
  labelCollapse,
  collapsedClass,
  expandedClass,
  bpsSelector
) {
  const bpsState = parseBpsState(bpsSelector);
  const collapsedClassRegex = new RegExp(`(${collapsedClass}[^'"\\s]*)`, 'gi');

  elements.forEach((element, index) => {
    const elIsCollapsible = isCollapsible(element, bpsState);
    const toggleElem = element.getElementsByClassName('js-collapsible__toggle')[0];
    const contentElem = element.getElementsByClassName('js-collapsible__content')[0];
    const contentId = contentElem.id || `collapsible__content${index}`;

    function toggle() {
      return toggleCollapsible(
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

    toggleElem.setAttribute('aria-controls', `"${contentId}"`);

    if (elIsCollapsible) {
      // Since there is no way to know if an event handler is attached, first
      // try to remove the toggle handler before adding it again,
      // to prevent duplicate execution, in cases where it was already attached.
      toggleElem.removeEventListener('mousedown', toggle, false);
      toggleElem.addEventListener('mousedown', toggle, false);


      if (!toggleElem.getAttribute('tabindex')) {
        // Make content element programmatically focusable,
        // but keep it outside the tab cycle
        toggleElem.setAttribute('tabindex', '-1');
      }

      if (
        elHasLayout(contentElem) ||
        window.getComputedStyle(contentElem).visibility !== 'hidden'
      ) {
        toggleElem.setAttribute('aria-label', `"${labelCollapse}"`);
        toggleElem.setAttribute('aria-expanded', true);
      }
      else {
        toggleElem.setAttribute('aria-label', `"${labelExpand}"`);
        toggleElem.setAttribute('aria-expanded', false);
      }
    }
    else {
      toggleElem.removeEventListener('click', toggle, false);
      toggleElem.removeAttribute('aria-controls');
      toggleElem.removeAttribute('aria-label');
      toggleElem.removeAttribute('aria-expanded');
      element.classList.add(expandedClass);
      /* eslint-disable no-param-reassign */
      element.className = element.className.replace(collapsedClassRegex, '');
    }

    if (typeof element.toggle !== 'function') {
      element.toggle = toggle;
    }
    /* eslint-enable no-param-reassign */
  });

  return elements;
}
