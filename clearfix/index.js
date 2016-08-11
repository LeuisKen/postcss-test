'use strict';

// 引入 postcss
var postcss = require('postcss')

// 将模块作为 postcss 的插件导出
module.exports = postcss.plugin('clearfix', function() {

  return function(css) {

    // 遍历所有的 clear 属性
    css.walkDecls('clear', function(decl) {
      // 如果 clear 属性的值，是 fix
      if (decl.value === 'fix') {
        // 将这一条 css 规则，传入我们的处理函数 clearFix
        clearFix(decl);
      }

    });

  };
});

/**
 * clear: fix; 规则的处理函数
 * @param  {string} decl  当前的 css 规则
 */
function clearFix(decl) {

  var origRule = decl.parent,             // 整个规则对象
      ruleSelectors = origRule.selectors, // 规则对象的选择器
      newRule;                            // 要新建的规则对象

  // 创建新规则对象的选择器，将现有规则的选择器遍历一遍并加上 ':after' 伪类
  ruleSelectors = ruleSelectors.map(function(ruleSelector){
      return ruleSelector + ':after';
    }).join(',\n');

  // 复制现有规则对象 origRule 创建新的规则对象，选择器设置为加了 ':after' 的 ruleSelectors
  // 后面的 removeAll 会移除 origRule 中已有的 decl
  newRule = origRule.cloneBefore({
    selector: ruleSelectors
  }).removeAll();

  // 将我们 clear : fix 的实现加入新的规则对象
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

  // 如果 origRule 仅包含 clear : fix，移除 origRule
  if (decl.prev() === undefined && decl.next() === undefined) {
    origRule.remove();
  } else {
    // 如果不是，则仅移除 clear : fix 这一行
    decl.remove();
  }

}
