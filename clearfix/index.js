'use strict';

// 引入 postcss
var postcss = require('postcss')

// 将模块作为 postcss 的插件导出
module.exports = postcss.plugin('clearfix', function() {

  return function(css) {

    // 遍历所有包涵 clear 的 decl
    css.walkDecls('clear', function(decl) {
      // 如果 decl 的值，也就是 clear 属性的值，是 fix
      if (decl.value === 'fix') {
        // 将这一条 decl ，传入我们的处理函数 clearFix
        clearFix(decl);
      }

    });

  };
});

/**
 * clear: fix; 规则的处理函数
 * @param  {string} decl  待处理的 decl
 */
function clearFix(decl) {

  var origRule = decl.parent,             // 获取 decl 的 rule
      ruleSelectors = origRule.selectors, // 获取 origRule 的选择器
      newRule;                            // 保存新的 rule 的变量

  // 创建 newRule 的选择器，将 origRule 的选择器遍历一遍并加上 ':after' 伪类
  ruleSelectors = ruleSelectors.map(function(ruleSelector){
      return ruleSelector + ':after';
    }).join(',\n');

  // 复制 origRule 创建 newRule ，选择器设置为加了 ':after' 的 ruleSelectors
  // 后面的 removeAll 会移除 origRule 中已有的 decl
  newRule = origRule.cloneBefore({
    selector: ruleSelectors
  }).removeAll();

  // 将我们 clear : fix 的实现加入 newRule
  newRule.append({
    prop: 'content',
    value: '\'\'',
    source: decl.source
  }, {
    prop: 'display',
    value: 'block',
    source: decl.source
  }, {
    prop: 'clear',
    value: 'both',
    source: decl.source
  });

  // 如果 origRule 仅包含 clear : fix，移除整个 origRule
  if (decl.prev() === undefined && decl.next() === undefined) {
    origRule.remove();
  } else {
    // 如果不是，则仅移除 clear : fix 这一行
    decl.remove();
  }

}
