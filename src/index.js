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
import { collapse, expand, toggle } from 'htz-collapsibles/changeState';

const allInstances = [];

/**
 * Initialize collapsible elements
 *
 * @param {String} element - The element to initialize.
 * @param {String} labelExpand - The label used to describe the toggle button
 *    when the element is collapsed and the toggle button is used for expanding.
 * @param {String} labelCollapse - The label used to describe the toggle button
 *    when the element is expanded and the toggle button is used for collapsing.
 * @param {String} [collapsedClass='o-collapsible-is-collapsed']
 *    The class to attach to the wrapper when it is collapsed.
 * @param {String} [expandedClass='o-collapsible-is-expanded']
 *    The class to attach to the wrapper when it is expanded.
 * @param {String} [bpsSelector='body']
 *    A selector for the element to which the active breakpoint data is attached.
 *    See [htz-parse-bps-state](https://github.com/haaretz/htz-parse-bps-state)
 *
 * @return {HTMLElement[]} Returns an array of collapsible elements.
 */
export default function collapsibles(
  element,
  labelExpand,
  labelCollapse,
  collapsedClass = 'o-collapsible-is-collapsed',
  expandedClass = 'o-collapsible-is-expanded',
  bpsSelector = 'body'
) {
  const toggleElem = element.getElementsByClassName('js-collapsible__toggle')[0];
  const contentElem = element.getElementsByClassName('js-collapsible__content')[0];
  const contentId = contentElem.id ||
    `collapsible__content${(Math.floor(Math.random() * 10000000000) + 1)}`;

  let isExpanded;

  toggleElem.addEventListener('click', toggleCb, false);
  toggleElem.setAttribute('aria-controls', contentId);


  window.addEventListener(
    'resize',
    debounce(
      () => {
        isExpanded = evaluate(
          element,
          contentElem,
          toggleElem,
          labelExpand,
          labelCollapse,
          collapsedClass,
          expandedClass,
          bpsSelector,
          isExpanded
        );
      },
      250
    )
  );

  isExpanded = evaluate(
    element,
    contentElem,
    toggleElem,
    labelExpand,
    labelCollapse,
    collapsedClass,
    expandedClass,
    bpsSelector,
    isExpanded
  );


  function toggleCb(evt) {
    // Only with left click, or when toggled programattically
    if (
      !evt || !evt.button || !evt.keyCode ||
      evt.button === 0 || evt.keyCode === 13 || evt.keyCode === 32
    ) {
      isExpanded = toggle(
        element,
        contentElem,
        toggleElem,
        labelExpand,
        labelCollapse,
        collapsedClass,
        expandedClass,
        bpsSelector,
        isExpanded
      );

      return isExpanded;
    }

    return isExpanded;
  }

  /**
   * Instance methods and properties
   *
   */
  const instance = {
    // Elements
    wrapper: element,
    toggleElem,
    contentElem,

    // State
    get isExpanded() { return isExpanded; },

    // Methods
    collapse() {
      isExpanded = collapse(
        element,
        contentElem,
        toggleElem,
        labelExpand,
        labelCollapse,
        collapsedClass,
        expandedClass,
        bpsSelector,
        isExpanded
      );

      return isExpanded;
    },
    expand() {
      isExpanded = expand(
        element,
        contentElem,
        toggleElem,
        labelExpand,
        labelCollapse,
        collapsedClass,
        expandedClass,
        bpsSelector,
        isExpanded
      );

      return isExpanded;
    },
    toggle: toggleCb,
  };

  if (allInstances.indexOf(instance) < 0) allInstances.push(instance);

  return instance;
}

/**
 * Get the instance API of a statful button.
 *
 * @memberof module:htz-collapsibles
 * @static
 *
 * @param {String|HTMLElement} collapsible - The `HTMLElement` or the `id` of a collapsible
 *   element's wrapper.
 *
 * @return {module:htz-collapsibles#API} - The API to control the instance.
 */
function getInstance(collapsible) {
  const instanceType = (
    Object
    .prototype
    .toString
    .call(collapsible)
    .match(/^\[object\s+(.*?)]$/)[1]
    || ''
  ).toLowerCase();

  const elem = instanceType === 'string' ? document.getElementById(collapsible) : collapsible;
  const instance = allInstances.filter(item => item.wrapper === elem)[0];

  return instance;
}

collapsibles.getInstance = getInstance;
