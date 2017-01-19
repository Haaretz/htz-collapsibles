# Responsive-Enabled Accessible Collapsible Content

This model enables markup agnostic collapsible content, that is accessible 
and can change based on viewport conditions.

Use the Breakpoints defined in [JigSass MQ](https://github.com/txhawks/jigsass-tools-mq/)
to define in which breakpoints an element is collapsible by specifying in the 
`data-collapsible-bps` as a comma separated list in the following format:
  - `<breakpoint-name>`: min-width breakpoints
  - `until-<breakpoint-name>`: max-width breakpoints
  - `<breakpoint-name>-until-<breakpoint-name>`: min-width-until-max-width (exclusive) breakpoints

So, `data-collapsible-bps="default"` on the collapsible element's wrapper would render that 
element collapsible on all breakpoints, while `data-collapsible-bps="s-until-m, l"`, would make 
an element collapsible between the `s` breakpoint and the `m` breakpoint (not including), and then 
again from the `l` breakpoint on.

Initialize a collapsible element with:
```js
  const collapsible = collapsibles(
    element,        // The element to initialize.

    labelExpand,    // The label used to describe the toggle button
                    // when the element is collapsed and the toggle button 
                    // is used for expanding.
    labelCollapse,  // The label used to describe the toggle button
                    // when the element is expanded and the toggle button is used 
                    // for collapsing.

    // Optional arguments
    collapsedClass  // The class to attach to the wrapper when it is collapsed.
                    // Default: 'o-collapsible-is-collapsed'
    expandedClass,  // The class to attach to the wrapper when it is expanded.
                    // Default: 'o-collapsible-is-expanded'
    bpsSelector     // A selector for the element to which the active breakpoint 
                    // data is attached. See [htz-parse-bps-state](https://github.com/haaretz/htz-parse-bps-state)
                    // Default: 'body'
  );
```
