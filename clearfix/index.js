'use strict';

var postcss = require('postcss'),
    displays = ['block', 'table'];

/**
 * Clear: fix; rule handler
 * @param  {string} decl  current decleration
 */
function clearFix(decl, opts) {

  var origRule = decl.parent,
      ruleSelectors = origRule.selectors,
      newRule;

  ruleSelectors = ruleSelectors.map(function(ruleSelector){
      return ruleSelector + ':after';
    }).join(',\n');

  // Insert the :after rule before the original rule
  newRule = origRule.cloneBefore({
    selector: ruleSelectors
  }).removeAll();

  newRule.append({
    prop: 'content',
    value: '\'\'',
    source: decl.source
  }, {
    prop: 'display',
    value: opts.display,
    source: decl.source
  }, {
    prop: 'clear',
    value: 'both',
    source: decl.source
  });

  // If the original rule only had clear:fix in it, remove the whole rule
  if (decl.prev() === undefined && decl.next() === undefined) {
    origRule.remove();
  } else {
    // Otherwise just remove the delcl
    decl.remove();
  }

}

module.exports = postcss.plugin('postcss-clearfix', function(opts) {
  opts = opts || {};

  if (displays.indexOf(opts.display) === -1) {
    opts.display = displays[0];
  }

  return function(css) {

    // Run handlers through all relevant CSS decls
    css.walkDecls('clear', function(decl) {

      if (decl.value === 'fix') {
        clearFix(decl, opts);
      }

    });

  };
});
