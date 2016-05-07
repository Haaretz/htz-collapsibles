/**
 *  HTZ COLLAPSIBLES
 *
 * Responsive-enabled, accessible collapsible content
 *
 * @module htz-collapsibles
 * @license MIT
 */
import debounce from 'lodash-es/debounce';
import evaluate from 'htz-collapsibles/evaluate';
import toggleCollapsible from 'htz-collapsibles/toggleCollapsible';

/**
 * Initialize collapsible elements
 *
 * @param {String} labelExpand - The label used to describe the toggle button
 *    when the element is collapsed and it is used expanding.
 * @param {String} labelCollapse - The label used to describe the toggle button
 *    when the element is expanded and it is used collapsing.
 * @param {String} [collapsedClass='o-collapsible-is-collapsed']
 *    The label to attach to the wrapper when it is collapsed.
 * @param {String} [expandedClass='o-collapsible-is-expanded']
 *    The label to attach to the wrapper when it is expanded.
 * @param {String} [initClass='js-collapsible'] - A class to identify collapsible items by.
 * @param {String} [bpsSelector='body']
 *    A selector for the element to which the active breakpoint data is attached.
 *    See [htz-parse-bps-state](https://github.com/haaretz/htz-parse-bps-state)
 *
 * @return {HTMLElement[]} Returns an array of collapsible elements.
 */
export default function collapsibles(
  labelExpand,
  labelCollapse,
  collapsedClass = 'o-collapsible-is-collapsed',
  expandedClass = 'o-collapsible-is-expanded',
  initClass = 'js-collapsible',
  bpsSelector = 'body'
) {
  const elements = Array.from(document.getElementsByClassName(initClass));
  function evaluateCb() {
    return evaluate(
      elements,
      labelExpand,
      labelCollapse,
      collapsedClass,
      expandedClass,
      bpsSelector
    );
  }

  elements.forEach((element, index) => {
    const toggleElem = element.getElementsByClassName('js-collapsible__toggle')[0];
    const contentElem = element.getElementsByClassName('js-collapsible__content')[0];
    const contentId = contentElem.id || `collapsible__content${index}`;

    function toggle(e) {
      // Only with left click, or when toggled programattically
      if (!e || e.button === 0 || e.keyCode === 13 || e.keyCode === 32) {
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

      return false;
    }

    toggleElem.addEventListener('click', toggle, false);
    toggleElem.setAttribute('aria-controls', `"${contentId}"`);

    if (typeof element.toggle !== 'function') {
      /* eslint-disable no-param-reassign */
      element.toggle = toggle;
      /* eslint-enable no-param-reassign */
    }
  });

  window.addEventListener('resize', debounce(evaluateCb, 250));

  return evaluateCb();
}
