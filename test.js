/* eslint-disable import/no-unresolved */
import collapsibles from 'htz-collapsibles';
/* eslint-enable import/no-unresolved */

const collapsibleEls = [...document.getElementsByClassName('js-collapsible')]
  .map(
    collapsible => collapsibles(collapsible, 'expand', 'collapse')
  );

export default collapsibleEls;
