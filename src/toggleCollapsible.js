/**
 * @module htz-collapsibles/toggleCollapsible
 * @license MIT
 */

import elHasLayout from 'htz-collapsibles/elHasLayout';
import isCollapsible from 'htz-collapsibles/isCollapsible';
import { parseBpsState } from 'htz-parse-bps-state';
import dispatchEvent from 'htz-dispatch-event';

/**
 * Collapse or expand an element
 *
 * @param {HTMLElement} wrapper - The element wrapping
 * @param {HTMLElement} contentElem - The element containing the collapsible content.
 * @param {HTMLElement} toggleElem - The clickable element used for toggling.
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
 * @fires module:htz-htz-collapsibles/toggleCollapsible#htz-collapsibles:expand-before
 * @fires module:htz-htz-collapsibles/toggleCollapsible#htz-collapsibles:expand-after
 * @fires module:htz-htz-collapsibles/toggleCollapsible#htz-collapsibles:collapse-before
 * @fires module:htz-htz-collapsibles/toggleCollapsible#htz-collapsibles:collapse-after
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

  const collapsedClassRegex = new RegExp(`(${collapsedClass}[^'"\\s]*)`, 'gi');
  const expandedClassRegex = new RegExp(`(${expandedClass}[^'"\\s]*)`, 'gi');

  function isCollapsed() {
    return !elHasLayout(contentElem) || isHidden || !contentElem;
  }

  if (isCollapsed()) {
    /**
     * A custom event fired before a collapsible is expanded
     * Stops execution if any of its handlers calls `event.preventDefault`.
     *
     * @event module:htz-htz-collapsibles/toggleCollapsible#htz-collapsibles:expand-before
     * @type {Object}
     * @prop {Object} detail
     * @prop {HTMLElement} detail.wrapper - The element wrapping
     * @prop {HTMLElement} detail.contentElem - The element containing the collapsible content.
     * @prop {HTMLElement} detail.toggleElem - The clickable element used for toggling.
     * @prop {Function} detail.isCollapsed - Retuns a `Boolean` indicating if the
     *     element is collapsed.
     */
    const allowed = dispatchEvent(
      wrapper,
      'htz-collapsibles:expand-before',
      { wrapper, contentElem, toggleElem, isCollapsed }
    );

    if (allowed) {
      wrapper.classList.add(expandedClass);
      /* eslint-disable no-param-reassign */
      wrapper.className = wrapper.className.replace(collapsedClassRegex, '');
      /* eslint-enable no-param-reassign */
      toggleElem.setAttribute('aria-label', labelCollapse);
      toggleElem.setAttribute('aria-expanded', true);

      // move focus to expanded content elem
      contentElem.focus();

      /**
       * A custom event fired after a collapsible is expanded
       *
       * @event module:htz-htz-collapsibles/toggleCollapsible#htz-collapsibles:expand-after
       * @type {Object}
       * @prop {Object} detail
       * @prop {HTMLElement} detail.wrapper - The element wrapping
       * @prop {HTMLElement} detail.contentElem - The element containing the collapsible content.
       * @prop {HTMLElement} detail.toggleElem - The clickable element used for toggling.
       * @prop {Function} detail.isCollapsed - Retuns a `Boolean` indicating if the
       *     element is collapsed.
       */
      dispatchEvent(
        wrapper,
        'htz-collapsibles:expand-after',
        { wrapper, contentElem, toggleElem, isCollapsed }
      );
    }
  }
  else {
    const bpsState = parseBpsState(bpsSelector);

    // Only collapse elements if collapsing is allowed at current breakpoint.
    if (isCollapsible(wrapper, bpsState)) {
      /**
      * A custom event fired before a collapsible is collapsed
      * Stops execution if any of its handlers calls `event.preventDefault`.
      *
      * @event module:htz-htz-collapsibles/toggleCollapsible#htz-collapsibles:collapse-before
      * @type {Object}
      * @prop {Object} detail
      * @prop {HTMLElement} detail.wrapper - The element wrapping
      * @prop {HTMLElement} detail.contentElem - The element containing the collapsible content.
      * @prop {HTMLElement} detail.toggleElem - The clickable element used for toggling.
      * @prop {Function} detail.isCollapsed - Retuns a `Boolean` indicating if the
      *     element is collapsed.
      */
      const allowed = dispatchEvent(
        wrapper,
        'htz-collapsibles:expand-before',
        { wrapper, contentElem, toggleElem, isCollapsed }
      );

      if (allowed) {
        toggleElem.focus();
        wrapper.classList.add(collapsedClass);
        /* eslint-disable no-param-reassign */
        wrapper.className = wrapper.className.replace(expandedClassRegex, '');
        /* eslint-enable no-param-reassign */
        toggleElem.setAttribute('aria-label', labelExpand);
        toggleElem.setAttribute('aria-expanded', false);

        /**
        * A custom event fired after a collapsible is collapsed
        *
        * @event module:htz-htz-collapsibles/toggleCollapsible#htz-collapsibles:collapse-after
        * @type {Object}
        * @prop {Object} detail
        * @prop {HTMLElement} detail.wrapper - The element wrapping
        * @prop {HTMLElement} detail.contentElem - The element containing the collapsible content.
        * @prop {HTMLElement} detail.toggleElem - The clickable element used for toggling.
        * @prop {Function} detail.isCollapsed - Retuns a `Boolean` indicating if the
        *     element is collapsed.
        */
        dispatchEvent(
          wrapper,
          'htz-collapsibles:collapse-after',
          { wrapper, contentElem, toggleElem, isCollapsed }
        );
      }
    }
  }

  return wrapper;
}
